
const getHeaderConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
export default getHeaderConfig
