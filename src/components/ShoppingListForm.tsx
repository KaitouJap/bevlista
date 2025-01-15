import { FC } from "react";
import Data from "../interfaces/Data";
import 'bootstrap/dist/css/bootstrap.min.css';

interface ShoppingListFormProps {
    editData: Partial<Data> | null;
    setEditData: React.Dispatch<React.SetStateAction<Partial<Data> | null>>;
    postData: () => void;
    updateData: (id: number, updateData: Partial<Data>) => void;
    error: string | null;
}

const ShoppingListForm: FC<ShoppingListFormProps> = ({ editData, setEditData, postData, updateData, error }) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editData && editData.id !== undefined) {
            updateData(editData.id, {
              Quantity: editData.Quantity,
              Product_Name: editData.Product_Name,
              unit_of_measurement: editData.unit_of_measurement,
            });
        }else{
            postData();
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return(
        <div>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    <label>
                        Product Name:
                        <input  type="text" 
                                name="Product_Name"
                                className="form-control form-control-custom"
                                value={editData?.Product_Name || ''} 
                                onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Quantity:
                        <input  type="number" 
                                name="Quantity"
                                className="form-control form-control-custom"
                                value={editData?.Quantity || ''} 
                                onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Unit of Measurement:
                        <input  type="text" 
                                name="unit_of_measurement"
                                className="form-control form-control-custom"
                                value={editData?.unit_of_measurement || ''} 
                                onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group mt-2">
                    {editData && editData.id !== undefined ? 
                        <div>
                            <button type="submit" className="btn btn-success me-2">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditData(null)}>Cancel</button>
                        </div> : 
                        <button type="submit" className="btn btn-primary">Add</button>
                    }
                </div>
            </form>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}

export default ShoppingListForm;