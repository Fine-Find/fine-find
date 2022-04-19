export const verifyAdminDashboard = (router, setAdmin) => {
  const role = localStorage.getItem('role');
  if (role !== 'admin') {
    router.push('/dashboard');
  } else {
    setAdmin(true);
  }
};
/**
 *
 * @param router needed in case we may redirect to a new page
 * @param redirect can be true or false, it will determine if a redirect is necessary or not
 * @param setDesigner set the state to true
 */

export const verifyDesignerDashboard = (router, redirect, setDesigner) => {
  const role = localStorage.getItem('role');
  if (role === 'admin' && redirect) {
    router.push('/admin');
  }
  if (role === 'designer') {
    setDesigner(true);
  }
};
