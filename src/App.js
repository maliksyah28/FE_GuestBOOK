import InputModal from "./components/InputModal";
import Navbar from "./components/Navbar";
import { HeadProvider, Title, Link, Meta } from "react-head";
import React, { useState, useEffect,useMemo } from "react";
import axiosInstance from "./service/axios";
import { MdBuildCircle } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";
import TableData from "./components/Table";
import moment from 'moment';
import { Row } from "reactstrap";
import PatchModal from "./components/PatchModal";

function App() {
  const [listData, setListData] = useState([]);
  const [choice,setChoice] = useState("")

  // fetch data table
  const fetchDataList = async () => {
    try {
      const headers= { 'Content-Type': 'application/x-www-form-urlencoded' }
      const get = await axiosInstance.get("/api/GuestBooks",headers);
      setListData(get.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect (() => {
    fetchDataList()
  },[])

  const dataGuest = React.useMemo(() => [...listData], [listData])
  
  const columnFunction = () => [
    {
      Header : "Nama",
      accessor : "nama",
    },
    {
      Header : "No.HP",
      accessor : "no_Hp"
    },
    {
      Header : "Email",
      accessor : "email"

    },
    {
      Header : "Alamat",
      accessor : "alamat"
    },
    {
      Header : "Provinsi",
      accessor : "provinsi"
    },
    {
      Header : "Kota / Kab",
      accessor : "kota_Kabupaten"
    },
    {
      Header : "Kecamatan",
      accessor : "kecamatan"
    },
    {
      Header : "Kelurahan",
      accessor : "kelurahan"
    },
    {
      Header : "KodePos",
      accessor : "kode_Pos"
    },
    {
      Header : "Kehadiran",
      accessor : "kehadiran",
      Cell: (props) => moment(props.value).add(1, 'days').format('LLL'),
    },
    {
      Header : "Action",
      Cell:({row: { original},
        
      }) => { 
         {
        return ( <>  
        <IconButton icon={MdBuildCircle} color="Black" onClick={() => deleteButt(original.id)}>
          tess
        </IconButton>
        <PatchModal idUpdate={original.id}/>
        {/* <IconButton icon={MdBuildCircle} color="Black" > 
        </IconButton> */}
      </>)} }
    
    }
  ]
  const columns = React.useMemo(columnFunction,[])

  const updateData = async (id) => {
    try {
      const updateRes = await axiosInstance.put(`/api/GuestBooks/${id}`)
     
      
    } catch (error) {
      console.log(error);
    }
  }


  
  const deleteButt = async (id)=> {
    try {
        const delRes = await axiosInstance.delete(`/api/GuestBooks/${id}`);
   
      alert("berhasil")
      fetchDataList()
    } catch (error) {
      console.log(error);
    }
  }
 
 

  return (
    <div className="App">
      <HeadProvider>
        <div className="Home">
          <Title>Guest Book</Title>
          <Link rel="canonical" href="http://jeremygayed.com/" />
          <Meta name="example" content="whatever" />
        </div>
      </HeadProvider>{" "}
      <Navbar />
      <InputModal />
      {/* // Table */}
      <TableData columns={columns} data={dataGuest}/>
     
    </div>
  );
}

export default App;
