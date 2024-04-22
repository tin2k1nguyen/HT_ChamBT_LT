import config from "./config";

const ApiUser = {
  login: (username, password) => {
    return config.post("/user/login", { username, password });
  },
  loadCurrentUser: () => {
    return config.get("/user/me");
  },
  signup: (user) => {
    return config.post("/user/signup", { ...user });
  },
  // get all users
  getAllUsers: () => {
    return config.get("/user");
  },
  // get user by id
  getUserById: (userId) => {
    return config.get(`/user/${userId}`);
  },
  // update user
  updateUser: (userId, data) => {
    return config.patch(`/user/${userId}`, data);
  },
  // delete user
  deleteUser: (userId) => {
    return config.delete(`/user/${userId}`);
  },
};

export default ApiUser;
