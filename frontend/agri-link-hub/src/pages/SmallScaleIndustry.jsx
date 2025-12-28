// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

// const SOCKET_URL = 'http://localhost:8000';

// export default function SmallScaleIndustry() {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [view, setView] = useState('products'); // 'products' or 'orders'
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [quantities, setQuantities] = useState({});

//   useEffect(() => {
//     // fetch initial products
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get('http://localhost:8000/api/farmer/get-listings', { withCredentials: true });
//         setProducts(res.data.listings || []);
//       } catch (err) {
//         console.error('Failed to fetch products', err);
//         setError('Failed to fetch products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();

//     // connect socket
//     const s = io(SOCKET_URL);
//     setSocket(s);

//     s.on('connect', () => console.log('socket connected', s.id));
//     s.on('productAdded', (product) => {
//       setProducts((prev) => [product, ...prev]);
//     });
//     s.on('orderPlaced', (order) => {
//       setOrders((prev) => [order, ...prev]);
//     });
//     s.on('orderCancelled', (order) => {
//       setOrders((prev) => prev.map(o => o._id === order._id ? order : o));
//     });
//     s.on('logisticsBooked', (order) => {
//       setOrders((prev) => prev.map(o => o._id === order._id ? order : o));
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   const handleQuantityChange = (productId, value) => {
//     setQuantities((q) => ({ ...q, [productId]: value }));
//   };

//   const handleBuy = async (product) => {
//     const qty = Number(quantities[product._id] || 1);
//     if (!qty || qty <= 0) return alert('Enter a valid quantity');

//     try {
//       const res = await axios.post('http://localhost:8000/api/small-scale-industry/buy', {
//         productId: product._id,
//         quantity: qty,
//         buyerName: 'SmallScaleIndustry',
//         buyerContact: '',
//         deliveryCharges: product.deliveryCharges || 0,
//       }, { withCredentials: true });
//       alert('Order placed');
//       // orderPlaced event will update orders via socket
//     } catch (err) {
//       console.error('Buy failed', err);
//       alert(err.response?.data?.message || 'Buy failed');
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get('http://localhost:8000/api/small-scale-industry/orders', {withCredentials: true});
//       setOrders(res.data.orders || []);
//     } catch (err) {
//       console.error('Failed to fetch orders', err);
//     }
//   };

//   const handleCancelOrder = async (orderId) => {
//     try {
//       await axios.post('http://localhost:8000/api/small-scale-industry/cancel', { orderId }, {withCredentials: true} );
//       alert('Order cancelled');
//       // server emits orderCancelled to update orders
//     } catch (err) {
//       console.error('Cancel failed', err);
//       alert(err.response?.data?.message || 'Cancel failed');
//     }
//   };

//   const handleBookLogistics = async (orderId) => {
//     try {
//       await axios.post('http://localhost:8000/api/farmer/orders/book-logistics', { orderId }, { withCredentials: true } );
//       alert('Logistics booked');
//     } catch (err) {
//       console.error('Book logistics failed', err);
//       alert(err.response?.data?.message || 'Booking failed');
//     }
//   };

//   return (
//     <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
//       <h2>Small Scale Industry Dashboard</h2>
//       <p style={{ color: '#666' }}>Real-time farmer product listings. Buy directly using the socket.</p>

//       <div style={{ marginBottom: 12 }}>
//         <button onClick={() => { setView('products'); fetchOrders(); }} style={{ marginRight: 8, padding: '6px 10px' }}>Products</button>
//         <button onClick={() => { setView('orders'); fetchOrders(); }} style={{ padding: '6px 10px' }}>Orders</button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {view === 'products' && (
//         <>
//           {!loading && products.length === 0 && (
//             <p>No products available right now.</p>
//           )}

//           <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
//             {products.map((p) => (
//               <div key={p._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6, background: '#fff' }}>
//                 <h3 style={{ margin: '0 0 8px' }}>{p.productName}</h3>
//                 <div style={{ fontSize: 13, color: '#444' }}>
//                   <div><strong>Category:</strong> {p.productCategory}</div>
//                   <div><strong>Available:</strong> {p.totalQuantity} {p.unitType}</div>
//                   <div><strong>Price:</strong> ₹{p.pricePerUnit} / {p.unitType}</div>
//                   <div style={{ marginTop: 8 }}><strong>Status:</strong> {p.status}</div>
//                   <div style={{ marginTop: 8 }}><strong>Can farmer Deliver:</strong> {p.canDeliver ?? 'no'}</div>
//                   <div style={{ marginTop: 8 }}><strong>Delivery charge:</strong> ₹{p.deliveryCharges ?? 0}</div>

//                   <div style={{ marginTop: 8 }}><strong>Location:</strong> {p.farmAddress?.village}, {p.farmAddress?.district}</div>
//                 </div>

//                 <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
//                   <input
//                     type="number"
//                     min="1"
//                     value={quantities[p._id] || ''}
//                     onChange={(e) => handleQuantityChange(p._id, e.target.value)}
//                     placeholder="Qty"
//                     style={{ width: 80, padding: 6 }}
//                   />

//                   <button onClick={() => handleBuy(p)} style={{ padding: '8px 12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
//                     Buy
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {view === 'orders' && (
//         <div>
//           {!orders.length && <p>No orders yet.</p>}
//           <div style={{ display: 'grid', gap: 12 }}>
//             {orders.map(o => (
//               <div key={o._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
//                 <div><strong>Product:</strong> {o.productName}</div>
//                 <div><strong>Quantity:</strong> {o.quantity}</div>
//                 <div><strong>Total:</strong> ₹{o.totalPrice}</div>
//                 <div><strong>Status:</strong> {o.status}</div>
//                 <div><strong>Logistics booked:</strong> {o.logisticsBooked ? 'Yes' : 'No'}</div>
//                 <div style={{ marginTop: 8 }}>
//                   <button onClick={() => handleCancelOrder(o._id)} style={{ marginRight: 8 }}>Cancel</button>
//                   <button onClick={() => handleBookLogistics(o._id)}>Book Logistics</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = 'http://localhost:8000';

export default function SmallScaleIndustry() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('products'); // 'products' or 'orders'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/api/farmer/get-listings', { withCredentials: true });
        setProducts(res.data.listings || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const s = io(SOCKET_URL);
    setSocket(s);

    s.on('connect', () => console.log('socket connected', s.id));
    s.on('productAdded', (product) => {
      setProducts((prev) => [product, ...prev]);
    });
    s.on('orderPlaced', (order) => {
      setOrders((prev) => [order, ...prev]);
    });
    s.on('orderCancelled', (order) => {
      setOrders((prev) => prev.map(o => o._id === order._id ? order : o));
    });
    s.on('logisticsBooked', (order) => {
      setOrders((prev) => prev.map(o => o._id === order._id ? order : o));
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities((q) => ({ ...q, [productId]: value }));
  };

  const handleBuy = async (product) => {
    const qty = Number(quantities[product._id] || 1);
    if (!qty || qty <= 0) return alert('Enter a valid quantity');

    try {
      await axios.post('http://localhost:8000/api/small-scale-industry/buy', {
        productId: product._id,
        quantity: qty,
        buyerName: 'SmallScaleIndustry',
        buyerContact: '',
        deliveryCharges: product.deliveryCharges || 0,
      }, { withCredentials: true });
      alert('Order placed');
    } catch (err) {
      console.error('Buy failed', err);
      alert(err.response?.data?.message || 'Buy failed');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/small-scale-industry/orders', {withCredentials: true});
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.post('http://localhost:8000/api/small-scale-industry/cancel', { orderId }, {withCredentials: true} );
      alert('Order cancelled');
    } catch (err) {
      console.error('Cancel failed', err);
      alert(err.response?.data?.message || 'Cancel failed');
    }
  };

  const handleBookLogistics = async (orderId) => {
    try {
      await axios.post('http://localhost:8000/api/farmer/orders/book-logistics', { orderId }, { withCredentials: true } );
      alert('Logistics booked');
    } catch (err) {
      console.error('Book logistics failed', err);
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-2xl font-bold mb-2">Small Scale Industry Dashboard</h2>
      <p className="text-gray-600 mb-4">Real-time farmer product listings. Buy directly using the socket.</p>

      <div className="mb-3 space-x-2">
        <button 
          onClick={() => { setView('products'); fetchOrders(); }} 
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Products
        </button>
        <button 
          onClick={() => { setView('orders'); fetchOrders(); }} 
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Orders
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {view === 'products' && (
        <>
          {!loading && products.length === 0 && (
            <p>No products available right now.</p>
          )}

          <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {products.map((p) => (
              <div key={p._id} className="border border-gray-300 p-3 rounded bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{p.productName}</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><strong>Category:</strong> {p.productCategory}</div>
                  <div><strong>Available:</strong> {p.totalQuantity} {p.unitType}</div>
                  <div><strong>Price:</strong> ₹{p.pricePerUnit} / {p.unitType}</div>
                  <div><strong>Status:</strong> {p.status}</div>
                  <div><strong>Can farmer Deliver:</strong> {p.canDeliver ?? 'no'}</div>
                  <div><strong>Delivery charge:</strong> ₹{p.deliveryCharges ?? 0}</div>
                  <div><strong>Location:</strong> {p.farmAddress?.village}, {p.farmAddress?.district}</div>
                </div>

                <div className="mt-3 flex gap-2 items-center">
                  <input
                    type="number"
                    min="1"
                    value={quantities[p._id] || ''}
                    onChange={(e) => handleQuantityChange(p._id, e.target.value)}
                    placeholder="Qty"
                    className="w-20 p-2 border rounded"
                  />
                  <button 
                    onClick={() => handleBuy(p)} 
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'orders' && (
        <div>
          {!orders.length && <p>No orders yet.</p>}
          <div className="grid gap-3">
            {orders.map(o => (
              <div key={o._id} className="border border-gray-300 p-3 rounded bg-white shadow-sm">
                <div><strong>Product:</strong> {o.productName}</div>
                <div><strong>Quantity:</strong> {o.quantity}</div>
                <div><strong>Total:</strong> ₹{o.totalPrice}</div>
                <div><strong>Status:</strong> {o.status}</div>
                <div><strong>Logistics booked:</strong> {o.logisticsBooked ? 'Yes' : 'No'}</div>
                <div className="mt-2 space-x-2">
                  <button 
                    onClick={() => handleCancelOrder(o._id)} 
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleBookLogistics(o._id)} 
                    className="px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                    Book Logistics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
