import Card from "./comps/card/card";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://7548-2a06-c701-4421-7b00-3cb0-41e5-b9ba-51ff.ngrok-free.app`,
          {
            method: 'GET',
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
