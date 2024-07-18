const useAuth = () => {
  const userInfo = localStorage.getItem('userInfo') || null;
  const secret = localStorage.getItem('secret') || null;

  console.log(userInfo, secret);

  return false;
};

export default useAuth;
