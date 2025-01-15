import { useEffect, useState } from 'react'
import ShoppingListForm from './components/ShoppingListForm';
import Data from './interfaces/Data';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Data> | null>(null);

  const fetchData = async () => {
    try{
      const response = await fetch('https://retoolapi.dev/meiGu6/data');
      if(!response.ok) throw new Error('Fetching data failed!');

      const result = await response.json();
      setData(result);
      setError(null);
    }catch(error: unknown){
      if(error instanceof Error) setError(error.message);
    }
  }

  const updateData = async (id: number, updatedItem: Partial<Data>) => {
    try{
      const response = await fetch(`https://retoolapi.dev/meiGu6/data/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...updatedItem,
          Quantity: Number(updatedItem.Quantity)
        })
      });
      if(!response.ok) throw new Error('Could not update data!');

      setEditData(null);
      fetchData();
    } catch(error: unknown){
      if(error instanceof Error) setError(error.message);
    }
}

const postData = async () => {
    try{
      const response = await fetch('https://retoolapi.dev/meiGu6/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Quantity: Number(editData!.Quantity),
          Product_Name: editData!.Product_Name,
          unit_of_measurement: editData!.unit_of_measurement
        })
      });
      if(!response.ok) throw new Error('Could not add data!');

      setError(null);
      setEditData(null);
      fetchData();
    }catch(error: unknown){
      if(error instanceof Error) setError(error.message);
    }
}

  const deleteData = async (id: number) => {
    try{
      const response = await fetch(`https://retoolapi.dev/meiGu6/data/${id}`, {
        method: 'DELETE'
      });
      if(!response.ok) throw new Error('Could not delete data!');

      setError(null);
      fetchData();
    } catch(error: unknown){
      if(error instanceof Error) setError(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Shopping List</h1>
      <hr />
      <div className='row justify-content-center'>
        <div className='col-auto'>
          <div className='card card-custom'>
            <h5 className='card-title card-title-custom text-center'>Add/Edit Item</h5>
            <div className='card-body d-flex justify-content-center align-items-center w-100'>
              <ShoppingListForm 
                editData={editData} 
                setEditData={setEditData} 
                postData={postData} 
                updateData={updateData} 
                error={error} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <table className='table table-sm table-responsive table-stripped table-bordered table-hover mt-4'>
          <thead className='table-dark'>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit of Measurement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='table-light'>
            {data.map((item) => (
              <tr key={item.id}>
                  <td>{item.Product_Name}</td>
                  <td>{item.Quantity}</td>
                  <td>{item.unit_of_measurement}</td>
                  <td>
                    <button className='btn btn-primary btn-sm me-2' onClick={() => setEditData(item)}>Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={() => deleteData(item.id)}>Delete</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default App
