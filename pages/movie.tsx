import withCallingApi from "../src/utils/with-calling-api";
import { apiTmdb } from "../src/services/apis";
import Movie from "../src/components/Movie";

export default withCallingApi({
  apiCall: ({ id, language }) => apiTmdb().movie(id, { language }),
  namespaces: "movie",
  namespacesRequired: ["movie", "common"]
})(Movie);
