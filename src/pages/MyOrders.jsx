import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEye, FaDownload, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * MyOrders component displays the user's order history
 */
const MyOrders = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { dashboard_data, loader } = useSelector(state => state.dashboard);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Establecer los pedidos del usuario desde los datos del dashboard
    if (dashboard_data?.orders) {
      setOrders(dashboard_data.orders);
    }
  }, [dashboard_data]);

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: es });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  // Status para representar diversos estados de los pedidos
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };

    const statusText = {
      pending: 'Pendiente',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {statusText[status] || status}
      </span>
    );
  };

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis Pedidos</h1>

      {orders && orders.length > 0 ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Pedido
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${order.price?.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/dashboard/order/${order._id}`}
                          className="text-blue-600 hover:text-blue-900"
                          aria-label={`Ver detalles del pedido #${order._id.slice(-6)}`}
                        >
                          <FaEye />
                        </Link>
                        {order.status === 'delivered' && (
                          <button 
                            className="text-green-600 hover:text-green-900"
                            aria-label={`Descargar factura del pedido #${order._id.slice(-6)}`}
                          >
                            <FaDownload />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <FaShoppingBag className="text-amber-500 text-xl" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No tienes pedidos</h2>
          <p className="text-gray-500 mb-6">Parece que aún no has realizado ningún pedido.</p>
          <Link 
            to="/shops" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Explorar productos
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders; 