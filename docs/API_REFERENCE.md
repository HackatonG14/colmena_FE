# API Reference - Colmena

Esta documentación describe la API necesaria para la implementación del backend de Colmena, el sistema de intercambio de servicios basado en economía colaborativa.

## Base URL

```
https://api.colmena.com/api/v1
```

Para entornos de desarrollo local:

```
http://localhost:5000/api
```

## Autenticación

La API utiliza autenticación basada en JWT (JSON Web Tokens). Para las rutas protegidas, se debe incluir el token en el header de la petición:

```
Authorization: Bearer <token>
```

## Convenciones de respuesta

### Respuesta exitosa

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operación completada con éxito",
  "data": { ... }
}
```

### Respuesta de error

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Descripción del error",
  "error": { ... }
}
```

## Códigos de estado

- `200 OK`: Petición exitosa
- `201 Created`: Recurso creado correctamente
- `400 Bad Request`: Error en la petición
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: No autorizado
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

---

## Endpoints

### Autenticación

#### Registro de usuario

```
POST /auth/register
```

**Body**

```json
{
  "name": "Usuario Ejemplo",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Usuario registrado correctamente",
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "name": "Usuario Ejemplo",
      "email": "usuario@ejemplo.com",
      "role": "user",
      "createdAt": "2023-06-18T14:23:12.156Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5..."
  }
}
```

#### Login

```
POST /auth/login
```

**Body**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "name": "Usuario Ejemplo",
      "email": "usuario@ejemplo.com",
      "role": "user",
      "avatar": "https://ejemplo.com/avatar.jpg",
      "createdAt": "2023-06-18T14:23:12.156Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5..."
  }
}
```

#### Obtener perfil de usuario

```
GET /auth/profile
```

**Headers**

```
Authorization: Bearer <token>
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Perfil recuperado correctamente",
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "name": "Usuario Ejemplo",
      "email": "usuario@ejemplo.com",
      "role": "user",
      "avatar": "https://ejemplo.com/avatar.jpg",
      "createdAt": "2023-06-18T14:23:12.156Z",
      "transactions": [...],
      "services": [...]
    }
  }
}
```

#### Actualizar perfil

```
PUT /auth/profile
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "name": "Nuevo Nombre",
  "avatar": "https://ejemplo.com/nuevo-avatar.jpg"
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Perfil actualizado correctamente",
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "name": "Nuevo Nombre",
      "email": "usuario@ejemplo.com",
      "role": "user",
      "avatar": "https://ejemplo.com/nuevo-avatar.jpg",
      "createdAt": "2023-06-18T14:23:12.156Z",
      "updatedAt": "2023-06-20T10:15:22.189Z"
    }
  }
}
```

---

### Servicios

#### Obtener servicios

```
GET /home/get-products
```

**Query Params**

```
category: string (opcional)
limit: number (opcional, por defecto 12)
page: number (opcional, por defecto 1)
search: string (opcional)
sortBy: string (opcional, valores: 'newest', 'rating', 'price_low', 'price_high')
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Servicios obtenidos correctamente",
  "data": {
    "products": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Clases de Programación",
        "slug": "clases-de-programacion",
        "description": "Clases personalizadas de programación en JavaScript y Python",
        "category": "Educación",
        "hoursRequired": 2,
        "price": 2,
        "discount": 0,
        "images": ["https://ejemplo.com/imagen1.jpg"],
        "stock": 10,
        "rating": 4.5,
        "shopInfo": {
          "shopName": "Academia JS",
          "city": "Madrid",
          "country": "España"
        },
        "sellerId": "60d21b4667d0d8992e610c86",
        "createdAt": "2023-06-18T14:23:12.156Z"
      }
      // ... más servicios
    ],
    "totalProducts": 100,
    "perPage": 12,
    "currentPage": 1,
    "totalPages": 9
  }
}
```

#### Obtener servicio por slug

```
GET /home/product-details/:slug
```

**Params**

```
slug: string (requerido)
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Servicio obtenido correctamente",
  "data": {
    "product": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Clases de Programación",
      "slug": "clases-de-programacion",
      "description": "Clases personalizadas de programación en JavaScript y Python",
      "category": "Educación",
      "hoursRequired": 2,
      "price": 2,
      "discount": 0,
      "images": ["https://ejemplo.com/imagen1.jpg"],
      "stock": 10,
      "rating": 4.5,
      "review": [
        {
          "_id": "60d21b4667d0d8992e610c87",
          "userId": "60d21b4667d0d8992e610c88",
          "userName": "Juan Pérez",
          "rating": 5,
          "comment": "Excelente servicio, muy recomendable",
          "date": "2023-06-19T10:12:45.156Z",
          "productId": "60d21b4667d0d8992e610c85"
        }
        // ... más reviews
      ],
      "exchangeFor": "Clases de diseño o marketing digital",
      "shopInfo": {
        "shopName": "Academia JS",
        "city": "Madrid",
        "country": "España"
      },
      "sellerId": "60d21b4667d0d8992e610c86",
      "sellerInfo": {
        "id": "60d21b4667d0d8992e610c86",
        "name": "Profesor Experto",
        "email": "profesor@ejemplo.com",
        "avatar": "https://ejemplo.com/avatar.jpg",
        "rating": 4.8
      },
      "createdAt": "2023-06-18T14:23:12.156Z"
    },
    "relatedProducts": [
      // ... servicios relacionados
    ]
  }
}
```

#### Crear un servicio

```
POST /home/create-product
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "name": "Clases de Programación",
  "description": "Clases personalizadas de programación en JavaScript y Python",
  "category": "Educación",
  "hoursRequired": 2,
  "price": 2,
  "discount": 0,
  "images": ["https://ejemplo.com/imagen1.jpg"],
  "stock": 10,
  "exchangeFor": "Clases de diseño o marketing digital",
  "shopInfo": {
    "shopName": "Academia JS",
    "city": "Madrid",
    "country": "España"
  }
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Servicio creado correctamente",
  "data": {
    "product": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Clases de Programación",
      "slug": "clases-de-programacion",
      "description": "Clases personalizadas de programación en JavaScript y Python",
      "category": "Educación",
      "hoursRequired": 2,
      "price": 2,
      "discount": 0,
      "images": ["https://ejemplo.com/imagen1.jpg"],
      "stock": 10,
      "rating": 0,
      "review": [],
      "exchangeFor": "Clases de diseño o marketing digital",
      "shopInfo": {
        "shopName": "Academia JS",
        "city": "Madrid",
        "country": "España"
      },
      "sellerId": "60d21b4667d0d8992e610c86",
      "createdAt": "2023-06-18T14:23:12.156Z"
    }
  }
}
```

#### Eliminar un servicio

```
DELETE /home/product/:id
```

**Headers**

```
Authorization: Bearer <token>
```

**Params**

```
id: string (requerido)
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Servicio eliminado correctamente",
  "data": {}
}
```

#### Enviar valoración de servicio

```
POST /home/customer/submit-review
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "rating": 5,
  "comment": "Excelente servicio, muy recomendable",
  "productId": "60d21b4667d0d8992e610c85"
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Valoración enviada correctamente",
  "data": {
    "review": {
      "_id": "60d21b4667d0d8992e610c87",
      "userId": "60d21b4667d0d8992e610c88",
      "userName": "Juan Pérez",
      "rating": 5,
      "comment": "Excelente servicio, muy recomendable",
      "date": "2023-06-19T10:12:45.156Z",
      "productId": "60d21b4667d0d8992e610c85"
    }
  }
}
```

---

### Categorías

#### Obtener categorías

```
GET /home/get-categorys
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Categorías obtenidas correctamente",
  "data": {
    "categorys": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Educación",
        "slug": "educacion",
        "image": "https://ejemplo.com/educacion.jpg",
        "createdAt": "2023-06-18T14:23:12.156Z"
      },
      {
        "_id": "60d21b4667d0d8992e610c86",
        "name": "Marketing",
        "slug": "marketing",
        "image": "https://ejemplo.com/marketing.jpg",
        "createdAt": "2023-06-18T14:23:12.156Z"
      }
      // ... más categorías
    ]
  }
}
```

---

### Carrito de intercambio

#### Añadir servicio al carrito

```
POST /card/add-to-card
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "productId": "60d21b4667d0d8992e610c85",
  "quantity": 1
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Servicio añadido al carrito correctamente",
  "data": {
    "card": {
      "_id": "60d21b4667d0d8992e610c89",
      "userId": "60d21b4667d0d8992e610c88",
      "products": [
        {
          "productId": "60d21b4667d0d8992e610c85",
          "quantity": 1,
          "productInfo": {
            // ... información del servicio
          }
        }
      ],
      "total": 2,
      "createdAt": "2023-06-19T10:12:45.156Z",
      "updatedAt": "2023-06-19T10:12:45.156Z"
    }
  }
}
```

#### Obtener carrito

```
GET /card/get-card-products
```

**Headers**

```
Authorization: Bearer <token>
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Carrito obtenido correctamente",
  "data": {
    "card": {
      "_id": "60d21b4667d0d8992e610c89",
      "userId": "60d21b4667d0d8992e610c88",
      "products": [
        {
          "productId": "60d21b4667d0d8992e610c85",
          "quantity": 1,
          "productInfo": {
            // ... información del servicio
          }
        }
      ],
      "total": 2,
      "createdAt": "2023-06-19T10:12:45.156Z",
      "updatedAt": "2023-06-19T10:12:45.156Z"
    }
  }
}
```

#### Actualizar cantidad de servicio en carrito

```
PUT /card/quantity-update
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "productId": "60d21b4667d0d8992e610c85",
  "quantity": 2
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cantidad actualizada correctamente",
  "data": {
    "card": {
      "_id": "60d21b4667d0d8992e610c89",
      "userId": "60d21b4667d0d8992e610c88",
      "products": [
        {
          "productId": "60d21b4667d0d8992e610c85",
          "quantity": 2,
          "productInfo": {
            // ... información del servicio
          }
        }
      ],
      "total": 4,
      "createdAt": "2023-06-19T10:12:45.156Z",
      "updatedAt": "2023-06-19T11:15:22.189Z"
    }
  }
}
```

#### Eliminar servicio del carrito

```
DELETE /card/remove-card-product/:productId
```

**Headers**

```
Authorization: Bearer <token>
```

**Params**

```
productId: string (requerido)
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Servicio eliminado del carrito correctamente",
  "data": {
    "card": {
      "_id": "60d21b4667d0d8992e610c89",
      "userId": "60d21b4667d0d8992e610c88",
      "products": [],
      "total": 0,
      "createdAt": "2023-06-19T10:12:45.156Z",
      "updatedAt": "2023-06-19T12:20:15.123Z"
    }
  }
}
```

---

### Pedidos

#### Crear pedido

```
POST /order/create-order
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "products": [
    {
      "productId": "60d21b4667d0d8992e610c85",
      "quantity": 2
    }
  ],
  "shippingInfo": {
    "userName": "Juan Pérez",
    "address": "Calle Ejemplo 123",
    "city": "Madrid",
    "country": "España",
    "phone": "+34612345678"
  }
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Pedido creado correctamente",
  "data": {
    "order": {
      "_id": "60d21b4667d0d8992e610c90",
      "userId": "60d21b4667d0d8992e610c88",
      "products": [
        {
          "productId": "60d21b4667d0d8992e610c85",
          "quantity": 2,
          "productInfo": {
            // ... información del servicio
          }
        }
      ],
      "shippingInfo": {
        "userName": "Juan Pérez",
        "address": "Calle Ejemplo 123",
        "city": "Madrid",
        "country": "España",
        "phone": "+34612345678"
      },
      "status": "pending",
      "total": 4,
      "createdAt": "2023-06-19T14:30:22.123Z"
    }
  }
}
```

#### Obtener pedidos del usuario

```
GET /order/customer/get-orders
```

**Headers**

```
Authorization: Bearer <token>
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Pedidos obtenidos correctamente",
  "data": {
    "orders": [
      {
        "_id": "60d21b4667d0d8992e610c90",
        "userId": "60d21b4667d0d8992e610c88",
        "products": [
          {
            "productId": "60d21b4667d0d8992e610c85",
            "quantity": 2,
            "productInfo": {
              // ... información del servicio
            }
          }
        ],
        "shippingInfo": {
          "userName": "Juan Pérez",
          "address": "Calle Ejemplo 123",
          "city": "Madrid",
          "country": "España",
          "phone": "+34612345678"
        },
        "status": "pending",
        "total": 4,
        "createdAt": "2023-06-19T14:30:22.123Z"
      }
      // ... más pedidos
    ]
  }
}
```

#### Obtener pedido por ID

```
GET /order/customer/get-order/:orderId
```

**Headers**

```
Authorization: Bearer <token>
```

**Params**

```
orderId: string (requerido)
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Pedido obtenido correctamente",
  "data": {
    "order": {
      "_id": "60d21b4667d0d8992e610c90",
      "userId": "60d21b4667d0d8992e610c88",
      "products": [
        {
          "productId": "60d21b4667d0d8992e610c85",
          "quantity": 2,
          "productInfo": {
            // ... información del servicio
          }
        }
      ],
      "shippingInfo": {
        "userName": "Juan Pérez",
        "address": "Calle Ejemplo 123",
        "city": "Madrid",
        "country": "España",
        "phone": "+34612345678"
      },
      "status": "pending",
      "total": 4,
      "createdAt": "2023-06-19T14:30:22.123Z"
    }
  }
}
```

#### Actualizar estado de pedido

```
PUT /order/update-order-status/:orderId
```

**Headers**

```
Authorization: Bearer <token>
```

**Params**

```
orderId: string (requerido)
```

**Body**

```json
{
  "status": "completed"
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Estado de pedido actualizado correctamente",
  "data": {
    "order": {
      "_id": "60d21b4667d0d8992e610c90",
      "userId": "60d21b4667d0d8992e610c88",
      "products": [
        {
          "productId": "60d21b4667d0d8992e610c85",
          "quantity": 2,
          "productInfo": {
            // ... información del servicio
          }
        }
      ],
      "shippingInfo": {
        "userName": "Juan Pérez",
        "address": "Calle Ejemplo 123",
        "city": "Madrid",
        "country": "España",
        "phone": "+34612345678"
      },
      "status": "completed",
      "total": 4,
      "createdAt": "2023-06-19T14:30:22.123Z",
      "updatedAt": "2023-06-20T10:15:22.189Z"
    }
  }
}
```

---

### Lista de deseos (Wishlist)

#### Añadir a lista de deseos

```
POST /home/customer/add-wishlist
```

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "productId": "60d21b4667d0d8992e610c85"
}
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Servicio añadido a la lista de deseos correctamente",
  "data": {
    "wishlist": ["60d21b4667d0d8992e610c85"]
  }
}
```

#### Obtener lista de deseos

```
GET /home/customer/get-wishlist
```

**Headers**

```
Authorization: Bearer <token>
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Lista de deseos obtenida correctamente",
  "data": {
    "wishlists": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Clases de Programación",
        "slug": "clases-de-programacion",
        "description": "Clases personalizadas de programación en JavaScript y Python",
        "category": "Educación",
        "hoursRequired": 2,
        "price": 2,
        "discount": 0,
        "images": ["https://ejemplo.com/imagen1.jpg"],
        "stock": 10,
        "rating": 4.5,
        "shopInfo": {
          "shopName": "Academia JS",
          "city": "Madrid",
          "country": "España"
        },
        "sellerId": "60d21b4667d0d8992e610c86",
        "createdAt": "2023-06-18T14:23:12.156Z"
      }
      // ... más servicios
    ]
  }
}
```

#### Eliminar de lista de deseos

```
DELETE /home/customer/remove-wishlist/:productId
```

**Headers**

```
Authorization: Bearer <token>
```

**Params**

```
productId: string (requerido)
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Servicio eliminado de la lista de deseos correctamente",
  "data": {
    "wishlist": []
  }
}
```

---

## Errores comunes

### Servicio no encontrado

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Servicio no encontrado",
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "details": "No se encontró ningún servicio con el slug proporcionado"
  }
}
```

### Error de autenticación

```json
{
  "success": false,
  "statusCode": 401,
  "message": "No autenticado",
  "error": {
    "code": "UNAUTHORIZED",
    "details": "Token de acceso no proporcionado o inválido"
  }
}
```

### Error de validación

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error de validación",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": {
      "email": "El formato del email no es válido",
      "password": "La contraseña debe tener al menos 8 caracteres"
    }
  }
}
```

---

## Paginación

Para los endpoints que devuelven múltiples resultados, la API utiliza un sistema de paginación basado en el número de página y el límite de resultados por página.

**Query Params**

```
page: number (opcional, por defecto 1)
limit: number (opcional, por defecto 12)
```

**Respuesta**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operación completada con éxito",
  "data": {
    "items": [...],
    "totalItems": 100,
    "perPage": 12,
    "currentPage": 1,
    "totalPages": 9
  }
}
```

---

## Versionado

La API de Colmena sigue versionado semántico (SemVer) y se accede a través de la ruta de base URL con el número de versión incluido.

```
/api/v1/...
```

Los cambios en la API se documentarán y comunicarán a los desarrolladores, siguiendo estos criterios:

- **Major version (v1, v2)**: Cambios no retrocompatibles
- **Minor version (v1.1, v1.2)**: Adiciones a la API manteniendo retrocompatibilidad
- **Patch version (v1.1.1, v1.1.2)**: Correcciones de errores

---

## Límites de uso

- Máximo de 100 peticiones por minuto por usuario
- Máximo de 10 MB por carga de archivo
- Máximo de 10 imágenes por servicio
- Máximo de 50 servicios en lista de deseos
- Máximo de 10 servicios por carrito

---

## Webhook Events

La API de Colmena proporciona webhooks para eventos importantes que pueden ser configurados para integraciones externas:

- `order.created`: Cuando se crea un nuevo pedido
- `order.updated`: Cuando se actualiza el estado de un pedido
- `user.registered`: Cuando un nuevo usuario se registra
- `review.submitted`: Cuando se envía una nueva valoración

Para configurar webhooks, contacte con el administrador del sistema.
