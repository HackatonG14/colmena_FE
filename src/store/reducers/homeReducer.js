import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_category = createAsyncThunk(
    'product/get_category',
    async(_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get('/home/get-categorys')
            return fulfillWithValue(data)
        } catch (error) {
            console.log('Error fetching categories:', error)
            return rejectWithValue({
                message: error.response?.data?.message || 'Error al obtener categorías',
                categorys: []
            })
        }
    }
)
// End Method 
export const get_products = createAsyncThunk(
    'product/get_products',
    async(_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get('/home/get-products')
             console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log('Error fetching products:', error)
            return rejectWithValue(error.response?.data || { message: 'Error al obtener productos' })
        }
    }
)
// End Method 


export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async(_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get('/home/price-range-latest-product')
             console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log('Error fetching price range:', error)
            return rejectWithValue(error.response?.data || { message: 'Error al obtener rango de precios' })
        }
    }
)
// End Method 

export const query_products = createAsyncThunk(
    'product/query_products',
    async(query , { fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''} `)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
        }
    }
)
// End Method 

export const product_details = createAsyncThunk(
    'product/product_details',
    async(slug, { rejectWithValue, fulfillWithValue, getState }) => {
        try {
            // Evitar realizar peticiones duplicadas si ya estamos procesando la misma
            const { home } = getState();
            if (home.loader && home.currentSlug === slug) {
                console.log(`Already fetching details for: ${slug}, skipping duplicate request`);
                return;
            }
            
            console.log(`Fetching details for product with slug: ${slug}`);
            const {data} = await api.get(`/home/product-details/${slug}`);
            console.log(`Successfully fetched details for: ${slug}`);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(`Error fetching details for ${slug}:`, error);
            return rejectWithValue({
                message: error.response?.data?.message || 'Error al obtener detalles del servicio',
                status: error.response?.status
            });
        }
    }
)
// End Method 

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async(info, { fulfillWithValue }) => {
        try {
            const {data} = await api.post('/home/customer/submit-review',info)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
        }
    }
)
// End Method 


export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async({productId, pageNumber}, { fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
        }
    }
)
// End Method 


export const get_banners = createAsyncThunk(
    'banner/get_banners',
    async( _ , { fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/banners`)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
        }
    }
)
// End Method 




export const homeReducer = createSlice({
    name: 'home',
    initialState:{
        categorys : [],
        products : [],
        totalProduct : 0,
        parPage: 3,
        latest_product : [],
        topRated_product : [],
        discount_product : [],
        priceRange : {
            low: 0,
            high: 100
        },
        product: {},
        relatedProducts: [],
        moreProducts: [],
        errorMessage : '',
        successMessage: '',
        totalReview: 0,
        rating_review: [],
        reviews : [],
        banners: [],
        currentSlug: null
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_category.pending, (state) => {
            state.loader = true;
        })
        .addCase(get_category.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.categorys = payload?.categorys || [];
            state.errorMessage = '';
        })
        .addCase(get_category.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload?.message || "Error al cargar categorías";
            state.categorys = payload?.categorys || [];
        })
        
        .addCase(get_products.pending, (state) => {
            state.loader = true;
        })
        .addCase(get_products.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.products = payload?.products || [];
            state.totalProduct = payload?.totalProduct || 0;
            state.priceRange = payload?.priceRange || { low: 0, high: 1000 };
        })
        .addCase(get_products.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload?.message || "Error al cargar productos";
            state.products = [];
        })
        
        .addCase(price_range_product.pending, (state) => {
            state.loader = true;
        })
        .addCase(price_range_product.fulfilled, (state, { payload }) => { 
            state.loader = false;
            state.latest_product = payload?.latest_product || [];
            state.topRated_product = payload?.topRated_product || [];
            state.discount_product = payload?.discount_product || [];
        })
        .addCase(price_range_product.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload?.message || "Error al cargar rango de precios";
            state.latest_product = [];
            state.topRated_product = [];
            state.discount_product = [];
        })
        .addCase(query_products.fulfilled, (state, { payload }) => { 
            state.products = payload.products;
            state.totalProduct = payload.totalProduct;
            state.parPage = payload.parPage; 
        })

        .addCase(product_details.pending, (state, { meta }) => {
            state.loader = true;
            state.currentSlug = meta.arg;
        })
        .addCase(product_details.fulfilled, (state, { payload, meta }) => { 
            state.loader = false;
            state.currentSlug = null;
            if (payload) {
                state.product = payload.product;
                state.relatedProducts = payload.relatedProducts;
                state.moreProducts = payload.moreProducts;
            }
        })
        .addCase(product_details.rejected, (state, { payload, meta }) => {
            state.loader = false;
            state.currentSlug = null;
            state.errorMessage = payload?.message || "Error al cargar detalles del servicio";
        })

        .addCase(customer_review.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
        })

        .addCase(get_reviews.fulfilled, (state, { payload }) => {
            state.reviews = payload.reviews;
            state.totalReview = payload.totalReview;
            state.rating_review = payload.rating_review;
        })

        .addCase(get_banners.fulfilled, (state, { payload }) => {
            state.banners = payload.banners; 
        })

    }
})
export const {messageClear} = homeReducer.actions
export default homeReducer.reducer