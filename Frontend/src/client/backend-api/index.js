import BookApi from "./book.js";
import UserApi from "./user.js";
const BackendApi = {
  book: BookApi,
  user: UserApi,
}

module.exports = { BackendApi }
