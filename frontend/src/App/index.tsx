import React, { useState, useEffect, FormEvent } from "react";
import { Item } from "../shared/utils/types";
import { fetchItems, registerItem } from "../shared/utils/api-service";

export const App: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<Item>({ name: '', price: 0 });

    useEffect(() => {
        fetchItems()
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        registerItem(newItem)
            .then((response) => {
                setItems([...items, response.data]);
                setNewItem({ name: '', price: 0 });
            })
            .catch((error) => {
                console.error('There was an error adding the item!', error);
            });
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h1>Shopping List</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) =>
                        setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                    }
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>
                    Add Item
                </button>
            </form>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
