import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConvertToJson from '../components/ConvertToJson';
import { useContext } from 'react';
import AppContext from '../AppContext';
import { API_WELDS_URL, API_WELD_DETAILS_URL, ENVIROMENT } from '../components/enviroment';

function Welds() {
    const [fetch, setFetch] = useState(false);
    const [weldsChecked, setWeldsChecked] = useState(false);
    const [foundBadWelds, setFoundBadWelds] = useState(false);
    const [data, setData] = useState([])
    const [sortOrder, setSortOrder] = useState("asc")
    const { setId } = useContext(AppContext)
    const navigate = useNavigate()

    // Navigate to /Welds/id
    const handleRowClick = (id) => {
        setId(id)
        navigate(`/Welds/${id}`)
    }

    // Renders background color by state
    const renderStateColor = (state) => {
        if (state === "Ok" || state === "OkEdited") {
            return <td style={{ backgroundColor: "#90EE90" }}>{state}</td>
        }
        if (state === "NotOk" || state === "NotOkEdited") {
            return <td style={{ backgroundColor: "#FF7377" }}>{state}</td>
        }
        return <td style={{ backgroundColor: "#ffb732" }}>{state}</td>
    }

    // Reformat to dd/mm/yyyy + time
    const reformatTimestamp = (ts) => {
        let tempArr = ts.split("T")
        let dateArr = tempArr[0].split("-")
        let timeArr = tempArr[1].split(".")
        console.log(timeArr[0])
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]} Time: ${timeArr[0]}`
    }

    // Map data to tbody
    const tbody = data.map((x, i) => {
        let ts = reformatTimestamp(x.Timestamp[0])
        return (
            <tr className='tablerow' key={x.Id[0]} onClick={() => handleRowClick(x.Id[0])}>
                <td>{i + 1}</td>
                {/* <td>{x.Id}</td> */}
                <td>{ts}</td>
                <td>{x.ProcessingStepNumber[0]}</td>
                <td>{x.PartSerialNumber[0]}</td>
                <td>{x.PartArticleNumber[0]}</td>
                <td>{x.MachineType[0]}</td>
                <td>{x.MachineSerialNumber[0]}</td>
                <td>{x.Welder[0]}</td>
                {renderStateColor(x.State[0])}
            </tr>
        )
    })

    useEffect(() => {
        setFetch(true)
    }, [])

    useEffect(() => {
        const fetchWelds = async () => {
            try {

                const res = await axios.get(API_WELDS_URL,{headers:{Accept:"Application/xml","Content-Type":"Application/xml"}});
                //let res = await fetch(API_WELDS_URL).then(response => response.text());
                console.log(res.data)
                const data = ConvertToJson(res.data);
                //const data = res.data
                console.log(data)
                setData(data.WeldListResponseModel.WeldInfos[0].WeldInfo);
                //setData(data.WeldInfos);
            } catch (error) {
                console.log(error);
            } finally {
                setFetch(false);
            }
        };
        if (fetch) fetchWelds();

        const interval = setInterval(() => {
            setFetch(true);
        }, 60000);
        return () => clearInterval(interval);
    }, [fetch]);

    // Sort table according to the state of the welds
    const sortByState = () => {
        const sortedData = [...data].sort((a, b) => {
            if (a.State[0] < b.State[0]) {
                return sortOrder === "asc" ? -1 : 1
            }
            if (a.State[0] > b.State[0]) {
                return sortOrder === "asc" ? 1 : -1
            }
            return 0
        })
        setData(sortedData)
        setSortOrder(sortOrder === "asc" ? "desc" : "asc") // Toggle the order, descending or ascending
    }

    useEffect(() => {
        const CheckWelds = () => {
            let badWelds = false;
            data.forEach(weld => {
                if (weld.State != "Ok") {
                    badWelds = true;
                }
            });
            if (badWelds) {
                setFoundBadWelds(true);
            } else {
                setFoundBadWelds(false);
            }
            setWeldsChecked(true);
        }
        if (data.length > 0) CheckWelds();
    }, [data]);

    return (
        <Container>
            {
                weldsChecked ?
                    foundBadWelds && data.length > 0 ?
                        <Alert variant="danger">
                            Some welds are faulty, click the "State" header to find them!
                        </Alert>
                        :
                        <Alert variant="success">
                            All welds OK!
                        </Alert>
                    : null
            }
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        {/* <th>Id</th> */}
                        <th>Timestamp <span className='text-muted'>(dd.mm.yyyy)</span></th>
                        <th>Processing step number</th>
                        <th>Part serial number</th>
                        <th>Part article number</th>
                        <th>Machine type</th>
                        <th>Machine serial number</th>
                        <th>Welder</th>
                        <th onClick={sortByState} id={"th-state"}>State{sortOrder === "asc" ? <>&darr;</> : <>&uarr;</>}</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </Table>
        </Container>
    )
}

export default Welds