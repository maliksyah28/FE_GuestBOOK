import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Image,
} from "@chakra-ui/react";
import InputModal from "./components/InputModal";
import Navbar from "./components/Navbar";
import { HeadProvider, Title, Link, Meta } from "react-head";
import { useState, useEffect } from "react";
import axiosInstance from "./service/axios";
function App() {
  const [listData, setListData] = useState([]);
  const fetchDataList = async () => {
    try {
      const get = await axiosInstance.get("/api/visitor");
      setListData(get.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Nama TAMU</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
