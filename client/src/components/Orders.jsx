import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../store/slices/orderSlice";
import DashboardHeader from "./DashboardHeader";
import { useEffect } from "react";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const role = useSelector((state) => state.auth.role);

  const getOrders = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/orders/get", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const { data } = await res.data;
    dispatch(setOrders(data));
  };

  useEffect(() => {
    getOrders();
  }, []);

  const convertDate = (date) => date.split("T")[0];

  return (
    <div>
      <DashboardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8">Orders</h1>
      <div className="overflow-x-auto sm:ml-8">
        <table className="w-full sm:w-[80vw] bg-white rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">Item</th>
              <th className="py-3 px-6 text-left">
                {role == "seller" ? "Purchaser" : "Author"} Name
              </th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders?.map((order) => (
              <tr
                key={order.razorpayOrderId}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{order.razorpayOrderId}</td>
                <td className="py-3 px-6 text-left">{order.title}</td>
                <td className="py-3 px-6 text-left">
                  {role == "buyer"
                    ? order.author.charAt(0).toUpperCase() +
                      order.author.slice(1)
                    : order.purchaser.charAt(0).toUpperCase() +
                      order.purchaser.slice(1)}
                </td>
                <td className="py-3 px-6 text-left">{convertDate(order.createdAt)}</td>
                <td className="py-3 px-6 text-right">${order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
