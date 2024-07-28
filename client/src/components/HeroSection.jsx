import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../../store/slices/postSlice";

const HeroSection = () => {
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    try {
      const search = e.target.value;
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `/post/search?search=${search} `
      );
      const { data } = await res.data;
      dispatch(setAllPosts(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="sm:w-[60vw] h-[20vh] overflow-clip sm:rounded-3xl mx-auto flex justify-center items-center ">
      <form className="absolute flex justify-center items-center">
        <input
          type="search"
          id="search"
          name="search"
          className="py-5 px-3 w-[80vw] sm:w-[40vw] text-xl sm:text-3xl mx-auto outline-none border-b-2 bg-bgColor"
          placeholder="Search your asset..."
          onChange={handleSearch}
        />
        <IoIosSearch className="text-3xl sm:text-5xl text-gray-400 -ml-10" />
      </form>
    </div>
  );
};

export default HeroSection;
