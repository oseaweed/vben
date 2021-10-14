export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

<<<<<<< HEAD
export const EXCEPTION_COMPONENT = () => import('../views/sys/exception/Exception.vue');
=======
export const EXCEPTION_COMPONENT = () => import('/@/views/sys/exception/Exception.vue');
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb

/**
 * @description: default layout
 */
export const LAYOUT = () => import('/@/layouts/default/index.vue');

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
};
