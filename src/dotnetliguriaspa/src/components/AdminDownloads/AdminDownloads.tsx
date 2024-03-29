import React,{FC,useState} from 'react';
import {Box,Button,TextField,Typography} from "@mui/material";
import {SubmitHandler,useForm} from "react-hook-form";

interface AdminDownloadsProps{
    pageName : string
}

type FormValues={
    firstName : string;
    lastName: string;
    address: string;
    age:number;
}

const AdminDownloads : FC<AdminDownloadsProps>=({pageName}) => {
   
    const {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm<FormValues>()

    const [data,setData]=useState<FormValues>({firstName :"", lastName:"", address:"", age:0})

    const onSubmit : SubmitHandler<FormValues>=(data : FormValues) => {
        setData(data);
        console.log("data:", data.firstName);
    }

    return (
        <>
            <Box pb={10}><Typography className="heading">{ pageName.toUpperCase() }</Typography></Box>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Box paddingTop={10}>
                    <TextField { ...register("firstName", {
                        required: "Name is required.",
                        minLength: {
                            value: 3,
                            message: "Name should be at least 3 characters",
                        },
                        maxLength: {
                            value: 10,
                            message: "Name should be at most 10 characters",
                        },
                    }) } id="standard-basic" label="Nome" variant="standard"/>
                    {errors.firstName && <Typography variant={"inherit"} color={"red"} fontSize={12}>{errors.firstName.message}</Typography>}<br/>
                    <TextField { ...register("lastName") } id="standard-basic" label="Cognome" variant="standard"/><br/>
                    <TextField { ...register("address") } id="standard-basic" label="Indirizzo" variant="standard"/><br/>
                    <TextField { ...register("age") } id="standard-basic" label="Età" variant="standard"/><br/>
                    <Box paddingTop={5}>
                        <Button variant="outlined" size={"large"} type={"submit"}>Invia</Button>
                    </Box>
                </Box>
            </form>
        </>
    )
};

export default AdminDownloads;
