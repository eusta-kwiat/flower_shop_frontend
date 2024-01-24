"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserOrders } from '../services/api';

export default function Orders () {
    const [orderList, setOrderList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getUserOrders()
            .then((res) => {
                setOrderList(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleRowClick = (orderId) => {
        router.push('/orders/' + orderId);
    }

    return (
        <div style={{margin: '25px'}}>
            <Table striped bordered hover variant='dark' responsive size='md'>
                <thead>
                    <tr>
                        <th>Nr zamówienia</th>
                        <th>Data</th>
                        <th>Czas</th>
                        <th>Status zamówienia</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((order) => (
                        <tr key={order.id} onClick={() => handleRowClick(order.id)}>
                            <td>{ order.id }</td>
                            <td>{ order.creation_date }</td>
                            <td>{ order.creation_time }</td>
                            <td>{ order.orderStatus.name }</td>
                            <td>{ parseFloat(order.cost).toFixed(2) }zł</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}