import { useState, useEffect } from "react";
import Menu from "./Menu";
import Loading from "./Loading";
import "./Menus.scss";
const url =
  "https://raw.githubusercontent.com/programmer-rahad/json-files/main/menus.json";

function Menus() {
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const menus = await response.json();

      setLoading(false);      

      setMenus(menus);
      setFilteredMenus(menus)
      setCategories(["all", ...new Set(menus.map((menu) => menu.category))]);

    } catch (error) {
      setLoading(false);
      console.log(error);      
    }
  };

  const filterMenus = category => {

    let filteredMenus = menus.filter(menu => menu.category === category);

    setFilteredMenus(category === 'all' ? menus : filteredMenus);
    setActiveCategory(category)

  }

  useEffect(() => {
    fetchMenus();
  }, []);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <section className="menu">
        <div className="title">
          <h2>our menu</h2>
          <div className="title-underline"></div>
        </div>
        <div className="btn-container">
          {categories.map((category,index) => (
            <button key={index} onClick={() => filterMenus(category)} className={`btn ${category === activeCategory && 'active'}`}>{category}</button>
          ))}
        </div>
        <div className="section-center">
          {filteredMenus.map((menu) => (
            <Menu key={menu.id} {...menu} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Menus;
