import Card from "./comps/card/card";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://b577-2a06-c701-4421-7b00-1196-8606-8c49-52eb.ngrok-free.app`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
        const data = await response.json();
        if (data.items) {
          setItems(data.items);
        } else if (data.err) {
          console.log(data.err);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      {loading && <div>Loading...</div>} 
      {!loading && items.length > 0 && (
        <div className="cards">
            {items.map((item, index) => (
              <Card key={index} item={item} />
          ))}
        </div>
      )}
      {!loading && items.length === 0 && (
        <div>No items found</div>
      )}
    </div>
  );
    }

export default App;
