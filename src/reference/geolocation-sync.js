/**
 * EXTRAIT VERBATIM — App SUPERVAN Driver
 * Source: App/Utils/transistorsoft.js
 *
 * Système de synchronisation GPS en arrière-plan via transistorsoft.
 *
 * BUG PRINCIPAL — isSyncing jamais reset en cas d'erreur :
 * - `isSyncing` est un flag module-level initialisé à false
 * - Il est mis à true AVANT l'appel API (ligne "isSyncing = true")
 * - Il est remis à false UNIQUEMENT après un succès
 * - En cas d'erreur (catch), isSyncing reste à true
 * - Résultat : toutes les synchronisations suivantes sont ignorées
 *   ("geoloc sync already in progress, aborting")
 * - La sync GPS est bloquée jusqu'au redémarrage complet de l'app
 *
 * C'est exactement le type de bug que useOfflineQueue doit éviter
 * avec un retry robuste et un état correctement géré.
 */

let isSyncing = false;

// ── HeadlessTask : exécuté en arrière-plan quand l'app est tuée ──

let HeadlessTask = async event => {
  let params = event.params;
  logger.info('[BackgroundGeolocation HeadlessTask] -', {name: event.name, params});

  switch (event.name) {
    case 'location':
      await attemptRestoringStateFromLocalStorage();

      const taskId = await BackgroundGeolocation.startBackgroundTask();
      if (!isSyncing) {
        isSyncing = true;
        try {
          await SpvApi.syncGeotracking(
            params.coords.latitude,
            params.coords.longitude
          );
          isSyncing = false; // ← uniquement ici, jamais dans le catch !
          await BackgroundGeolocation.stopBackgroundTask(taskId);
        } catch (error) {
          logger.error(
            'Uncaught exception in BackgroundGeolocation.headlessTask',
            {message: error.message},
          );
          // ⚠️ isSyncing n'est PAS remis à false ici
          await BackgroundGeolocation.stopBackgroundTask(taskId);
        }
      } else {
        logger.info('GEOLOC SYNC ALREADY IN PROGRESS, ABORTING >_< !');
        await BackgroundGeolocation.stopBackgroundTask(taskId);
      }

      break;
  }
};

// ── onLocation : exécuté en foreground quand l'app est ouverte ──

export async function configureBackgroundLocationHttpSync(onlineStatus) {
  if (currentListener.eventHandler) {
    await currentListener.eventHandler.remove();
  }

  currentListener = {
    eventHandler: BackgroundGeolocation.onLocation(
      async location => {
        const taskId = await BackgroundGeolocation.startBackgroundTask();
        if (!isSyncing) {
          isSyncing = true;
          try {
            await SpvApi.syncGeotracking(
              location.coords.latitude,
              location.coords.longitude
            );
            isSyncing = false; // ← uniquement ici, jamais dans le catch !
            await BackgroundGeolocation.stopBackgroundTask(taskId);
          } catch (error) {
            await logger.error(
              'Uncaught exception in BackgroundGeolocation.onLocation',
              {message: error.message},
            );
            // ⚠️ isSyncing n'est PAS remis à false ici — même bug
            await BackgroundGeolocation.stopBackgroundTask(taskId);
          }
        } else {
          await logger.debug('geoloc sync already in progress, aborting.');
          await BackgroundGeolocation.stopBackgroundTask(taskId);
        }
      },
      async error => {
        await logger.error('[onLocation] ERROR: ', {message: error});
      },
    ),
  };

  if (onlineStatus === true || onlineStatus === '1') {
    await BackgroundGeolocation.start();
  } else {
    await BackgroundGeolocation.stop();
  }
}
