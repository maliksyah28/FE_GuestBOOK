import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast
} from "@chakra-ui/react";
import getDataProv from "../../service/getDataProv";
import axiosInstance from "../../service/axios";
import validator from "validator";

function InputModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // console.log(provinced);


  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // fetch dataprov
  const [dataprov, setDataProvince] = useState([]);
  const [selectedProvID, setSelectedProvID] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  const initUrlprov = `https://api.goapi.id/v1/regional/provinsi?api_key=2RtX62lzOTTiTn64KrSCJURE1wSAjH&`;
  useEffect(() => {
    async function province() {
      let data = await getDataProv(initUrlprov);
      setDataProvince(data.data);
    }
    province();
  }, []);
  //render option province
  const renderProvince = () => {
    return dataprov.map((x) => (
      <option key={x.id} value={`${x.name},${x.id}`}>
        {x.name}
      </option>
    ));
  };
  const onHandleChangeProvince = (e) => {
    setSelectedProvID(e.target.value);
    setSelectedProvince(e.target.value);
  };

  //fetch city
  const [dataCity, setDataCity] = useState([]);
  const [selectedCityID, setSelectedCityID] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const provinsi_id = selectedProvID.split(",");
  // console.log(provinsi_id[0]); //provinsi
  const initUrlCity = `https://api.goapi.id/v1/regional/kota?api_key=2RtX62lzOTTiTn64KrSCJURE1wSAjH&provinsi_id=${provinsi_id[1]}`;
  useEffect(() => {
    async function city() {
      let data = await getDataProv(initUrlCity);
      setDataCity(data.data);
    }
    city();
  }, [provinsi_id[1]]);
  const renderCity = () => {
    return dataCity.map((x) => (
      <option key={x.id} value={`${x.name},${x.id}`}>
        {x.name}
      </option>
    ));
  };
  const onHandleChangeCity = (e) => {
    setSelectedCityID(e.target.value);
    setSelectedCity(e.target.value);
  };

  // fecth kecamatan
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [selectedKecID, setSelectedKecID] = useState("");
  const [selectedKec, setSelectedKec] = useState("");
  const kota_id = selectedCityID.split(",");
  // console.log(kota_id[0]); //kota
  const initUrlKec = `https://api.goapi.id/v1/regional/kecamatan?api_key=2RtX62lzOTTiTn64KrSCJURE1wSAjH&kota_id=${kota_id[1]}`;
  useEffect(() => {
    async function kecamatan() {
      let data = await getDataProv(initUrlKec);
      setDataKecamatan(data.data);
    }
    kecamatan();
  }, [kota_id[1]]);
  const renderKecamatan = () => {
    return dataKecamatan.map((x) => (
      <option key={x.id} value={`${x.name},${x.id}`}>
        {x.name}
      </option>
    ));
  };
  const onHandleChangeKec = (e) => {
    setSelectedKecID(e.target.value);
    setSelectedKec(e.target.value);
  };

  //fetch kelurahan
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [selectedKelID, setSelectedKelID] = useState("");
  const [selectedKel, setSelectedKel] = useState("");
  const kecamatan_id = selectedKecID.split(",");
  // console.log(kecamatan_id[0]); //kecamatan
  const initUrlKel = `https://api.goapi.id/v1/regional/kelurahan?api_key=2RtX62lzOTTiTn64KrSCJURE1wSAjH&kecamatan_id=${kecamatan_id[1]}`;
  useEffect(() => {
    async function kelurahan() {
      let data = await getDataProv(initUrlKel);
      setDataKelurahan(data.data);
    }
    kelurahan();
  }, [kecamatan_id[1]]);
  const renderKelurahan = () => {
    return dataKelurahan.map((x) => (
      <option key={x.id} value={`${x.name},${x.id}`}>
        {x.name}
      </option>
    ));
  };
  const onHandleChangeKel = (e) => {
    setSelectedKelID(e.target.value);
    setSelectedKel(e.target.value);
  };
  const kelurahan_id = selectedKelID.split(",");
  // console.log(kelurahan_id[0]); //kelurahan
  const [name,setName] = useState("")
  const [handphone,setHandphone] = useState("")
  const [email,setEmail] = useState("")
  const [alamat, setAlamat] = useState("")
  const [kodePos, setKodePos] = useState("")
  const [message, setMessage] = useState("");

 
  const emailValidation = () => {
    const regEx= /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2-8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      setMessage("email valid")
    } else if (!regEx.test(email) && email !== "") {
      setMessage("email not valid")
    } else {
      setMessage("")
    }
  }
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
 
  const onClickSave = async () => {
    try {

      const body = {
        nama : name,
        no_Hp : handphone,
        email : email,
        alamat : alamat,
        provinsi : provinsi_id[0],
        kota_Kabupaten : kota_id[0],
        kecamatan : kecamatan_id[0],
        kelurahan : kelurahan_id[0],
        kode_Pos : kodePos
      }
 
     
      if (validator.isEmail(email)) {
        await axiosInstance.post("/api/GuestBooks",body)
        window.location.reload();
        return toast({
          title: 'berhasil terdaftar',
          status: 'Passed',
          position: 'top',
          duration: 2000,
          isClosable: true,
        });
      } else {
        setMessage("Please, enter valid Email!");
        return toast({
          title: 'Please, enter valid email',
          status: 'error',
          position: 'top',
          duration: 2000,
          isClosable: true,
        });
        
      }
      emailValidation()
      
      console.log(body);
      // console.log(save);
    } catch (error) {
      console.log(error);
     
    }
  };
  return (
    <>
     
      <Button onClick={onOpen} margin={"20px"}>
        Guest Input
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Formulir Tamu</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>No Handphone</FormLabel>
              <Input placeholder="NO HP" value={handphone} onChange={(event) => setHandphone(event.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Alamat</FormLabel>
              <Input placeholder="Alamat" value={alamat} onChange={(event) => setAlamat(event.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" value={email} onChange={handleOnChange} />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"sm"}>Provinsi</FormLabel>
              <Select
                _focusVisible
                name="province_id"
                fontSize={{ base: "13", md: "14" }}
                fontWeight={400}
                placeholder="Pilih Provinsi"
                variant="filled"
                onChange={onHandleChangeProvince}
              >
                {renderProvince()}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"sm"}>Kota</FormLabel>
              <Select
                _focusVisible
                name="kota_id"
                fontSize={{ base: "13", md: "14" }}
                fontWeight={400}
                placeholder="Pilih Kota"
                variant="filled"
                onChange={onHandleChangeCity}
              >
                {renderCity()}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"sm"}>Kecamatan</FormLabel>
              <Select
                _focusVisible
                name="kecamatan_id"
                fontSize={{ base: "13", md: "14" }}
                fontWeight={400}
                placeholder="Pilih Kecamatan"
                variant="filled"
                onChange={onHandleChangeKec}
              >
                {renderKecamatan()}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"sm"}>Kelurahan</FormLabel>
              <Select
                _focusVisible
                name="kelurahan_id"
                fontSize={{ base: "13", md: "14" }}
                fontWeight={400}
                placeholder="Pilih Kelurahan"
                variant="filled"
                onChange={onHandleChangeKel}
              >
                {renderKelurahan()}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Kode Post</FormLabel>
              <Input placeholder="kode post" value={kodePos} onChange={(event) => setKodePos(event.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClickSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default InputModal;
