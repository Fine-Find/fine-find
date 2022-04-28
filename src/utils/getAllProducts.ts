import { getAllProductsRequested } from './firebaseFirestore';

const products = (setData) => {
  try {
    getAllProductsRequested()
      .then((results) => {
        setData([...results]);
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    return err;
  }
};
export default products;
