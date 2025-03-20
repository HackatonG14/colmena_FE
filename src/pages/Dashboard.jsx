import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { get_dashboard_index_data } from '../store/reducers/dashboardReducer';
import { Card } from '../components/ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Dashboard home page component
 * Shows user profile information and account summary
 */
const Dashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { dashboard_data, loader } = useSelector(state => state.dashboard);

  useEffect(() => {
    // Obtener datos del dashboard si hay un usuario autenticado
    if (userInfo) {
      dispatch(get_dashboard_index_data(userInfo.id));
    }
  }, [dispatch, userInfo]);

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: es });
    } catch (error) {
      return 'Fecha inválida';
    }
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h1>
      
      {/* Profile card */}
      <Card className="mb-8">
        <Card.Header>
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                {userInfo?.image ? (
                  <img 
                    src={userInfo.image} 
                    alt={userInfo.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-3xl text-amber-500" />
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userInfo?.name || 'Usuario'}</h2>
              <p className="text-gray-500">
                Miembro desde {formatDate(userInfo?.createdAt)}
              </p>
            </div>
          </div>
        </Card.Header>
        
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Información de contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaEnvelope className="text-amber-500 mr-3" />
                  <span>{userInfo?.email || 'No disponible'}</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="text-amber-500 mr-3" />
                  <span>{userInfo?.phone || 'No disponible'}</span>
                </li>
                <li className="flex items-center">
                  <FaMapMarkerAlt className="text-amber-500 mr-3" />
                  <span>{userInfo?.address || 'No disponible'}</span>
                </li>
                <li className="flex items-center">
                  <FaCalendarAlt className="text-amber-500 mr-3" />
                  <span>{formatDate(userInfo?.createdAt)}</span>
                </li>
              </ul>
            </div>
            
            {/* Account statistics */}
            <div>
              <h3 className="text-lg font-medium mb-4">Resumen de la cuenta</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-amber-700 font-medium">Pedidos</p>
                  <p className="text-2xl font-bold text-amber-800">
                    {dashboard_data?.orders?.length || 0}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-blue-700 font-medium">Favoritos</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {dashboard_data?.wishlist?.length || 0}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-green-700 font-medium">Completados</p>
                  <p className="text-2xl font-bold text-green-800">
                    {dashboard_data?.completed_orders || 0}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-purple-700 font-medium">Intercambios</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {dashboard_data?.exchanges || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      {/* Recent activity - placeholder for future content */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium">Actividad reciente</h3>
        </Card.Header>
        <Card.Body>
          <p className="text-gray-500 italic">No hay actividad reciente para mostrar.</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;