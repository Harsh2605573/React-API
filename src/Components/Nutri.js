import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

function Nutri() {

    const [data, setData] = useState([])
    const [data1, setData1] = useState({})

    useEffect(() => {
        fatchData()
    }, [])

    const fatchData = () => {
        axios.get('https://service.apikeeda.com/api/v1/nutri-food', {
            headers: {
                "x-apikeeda-key": "d1723813034672ctl993959818us"
            }
        })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const remove = (id) => {
        console.log(id)

        axios.delete(`https://service.apikeeda.com/api/v1/nutri-food/${id}`, {
            headers: {
                "x-apikeeda-key": "d1723813034672ctl993959818us"
            }
        })
            .then((res) => {
                console.log(res);
                fatchData()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleEdit = (e) => {
        console.log(e);
        setData1(e)
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    productName: data1.productName || '',
                    weight: data1.weight || '',
                    energy: data1.energy || '',
                    protine: data1.protine || '',
                    carbohydrate: data1.carbohydrate || '',
                    fat: data1.fat || '',
                }}
                enableReinitialize
                onSubmit={async (values, { resetForm }) => {

                    if (data1._id) {
                        axios.patch(`https://service.apikeeda.com/api/v1/nutri-food/${data1._id}`, values, {
                            headers: {
                                "x-apikeeda-key": "d1723813034672ctl993959818us"
                            }
                        })
                            .then((res) => {
                                console.log(res);
                                fatchData()
                                setData1({
                                    productName: '',
                                    weight: '',
                                    energy: '',
                                    protine: '',
                                    carbohydrate: '',
                                    fat: '', 
                                })
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    } else {
                        console.log(data1._id, "sdfsdfsdsdgdf");

                        axios.post('https://service.apikeeda.com/api/v1/nutri-food', values, {
                            headers: {
                                "x-apikeeda-key": "d1723813034672ctl993959818us"
                            }
                        })
                            .then((res) => {
                                console.log(res);
                                fatchData()
                            })
                            .catch((err) => {
                                console.log(err);
                            })

                    }
                    resetForm("")
                }}
            >
                <Form>
                    <label htmlFor="productName">ProductName</label>
                    <Field id="productName" name="productName" placeholder="test 223" />

                    <label htmlFor="weight">Weight</label>
                    <Field id="weight" name="weight" placeholder="11" />

                    <label htmlFor="energy">Energy</label>
                    <Field id="energy" name="energy" placeholder="11.2" />

                    <label htmlFor="protine">Protine</label>
                    <Field id="protine" name="protine" placeholder="2.3" />

                    <label htmlFor="carbohydrate">Carbohydrate</label>
                    <Field id="carbohydrate" name="carbohydrate" placeholder="1.1" />

                    <label htmlFor="fat">Fat</label>
                    <Field id="fat" name="fat" placeholder="6" />

                    <button type="submit" >Submit</button>
                    {/* <button type="delete" onClick={remove}>Remove</button> */}
                </Form>
            </Formik>
            <table>
                <thead>
                    <tr>
                        <th>ProductName</th>
                        <th>Weight</th>
                        <th>Energy</th>
                        <th>Protine</th>
                        <th>Carbohydrate</th>
                        <th>Fat</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((el, i) => (
                        <tr key={i}>
                            <td>{el.productName}</td>
                            <td>{el.weight}</td>
                            <td>{el.energy}</td>
                            <td>{el.protine}</td>
                            <td>{el.carbohydrate}</td>
                            <td>{el.fat}</td>
                            <button onClick={() => remove(el._id)}>Delete</button>
                            <button onClick={() => handleEdit(el)}>Edit</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Nutri
