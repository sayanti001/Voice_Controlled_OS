import axios from 'axios'
const host='http://127.0.0.1:8000';

export const getText=async(voicefile)=>{
    // axios
    try {
    const res = await axios.post(`${host}/converttotext`, {
            voice:voicefile
        }, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }
    )
    console.log("TEXT",res)
    return res.data.text
    }catch(err){
        console.log("ERR",err)
        return {error:<span className='text-red-600'>{err.message}</span>}
    }
}

export const getExecute=async(file)=>{
    // axios
    const res = await axios.post(`${host}/execute`, {
            voice:file,
        }, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }
    )
    console.log("EXEC",res)
    return res.data
}
