import { watch, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useGlobSetting } from '/@/hooks/setting';
import { useRouter } from 'vue-router';
<<<<<<< HEAD
=======
import { useLocaleStore } from '/@/store/modules/locale';
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb

import { REDIRECT_NAME } from '/@/router/constant';

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { title } = useGlobSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();
<<<<<<< HEAD
=======
  const localeStore = useLocaleStore();
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb

  const pageTitle = usePageTitle();

  watch(
<<<<<<< HEAD
    () => currentRoute.value.path,
=======
    [() => currentRoute.value.path, () => localeStore.getLocale],
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) {
        return;
      }

      const tTitle = t(route?.meta?.title as string);
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
