import { useState } from "react";
import { TextField } from '@mui/material';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const PersonalInfo = () => {

    const { id } = useParams();
    const [biography, setBiography] = useState('')
    const [disable, setDisable] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:5000/instructor/getInstructor/${id}`)
            .then((response) => setBiography(response.data.biography))
            .catch(e => console.log(e))
        console.log()
    }, [])

    const handleEdit = () => {
        setDisable(false)
    }
    const handleSave = () => {
        axios.patch(`http://localhost:5000/instructor/editBiography/${id}`, {
            biography: biography
        })
            .then((response) => console.log(response.data.biography))
            .catch(e => console.log(e))
        setDisable(true)
    }

    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Biography"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 200 }}
                style={{ width: 600 }}
                onChange={(e) => setBiography(e.target.value)}
                value={biography}
                disabled={disable}
            />
            <br />
            <button onClick={disable ? handleEdit : handleSave}>{disable ? 'edit' : 'save'}</button>
        </div>
    );
}

export default PersonalInfo;