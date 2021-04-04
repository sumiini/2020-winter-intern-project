import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import classnames from 'classnames';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardDeck,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Collapse,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    Jumbotron,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    FormGroup,
    Label,
    Form,
    Alert,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    CardText,
    Toast,
    ToastHeader,
    ToastBody,
    InputGroupText,
    Badge,
    Fade,
    Pagination,
    PaginationItem,
    PaginationLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const Hei1000 = styled.div`
  @media screen and (max-width: 768px) {
    padding: 20px;
    height: auto;
  }
  @media screen and (min-width: 769px) {
    padding: 40px 30px;
    height: 500px;
  }
  overflow-x: auto;
`;
const RightButton = styled.div`
  position: relative;
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
`;

const WhiteSpace = styled.div`
  margin: 10px;
`;

const FlexBox = styled.div`
  display: flex;
`;

const Box = styled.div`
  border: 1.5px solid rgb(221, 221, 221);;
  border-radius: 7px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: white;
`;

const ProgramBox = styled.div`
  border: 1.5px solid #cecece;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  width: 45%;
  height: 200px;
  float: left;
`;

const ProgramBoxRight = styled.div`
  border: 1.5px solid #cecece;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  width: 45%;
  height: 200px;
  float: right;
`;

const UserBox = styled.div`
  border: 1.5px solid #cecece;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 43px;
  width: 45%;
  height: 230px;
  float: left;
`;

const UserBoxRight = styled.div`
  border: 1.5px solid #cecece;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 43px;
  width: 45%;
  height: 230px;
  float: right;
`;

const ListBox = styled.div`
  border: 1.5px solid rgb(221, 221, 221);;
  border-radius: 7px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: white;
  /*overflow: scroll;
  height: 450px;*/
`;

const ProgramUser = () => {
    axios.defaults.headers.common = { Accept: 'application/x-www-form-urlencoded, text/plain, \*/*' };
    
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [type, setType] = useState(0);
    const [programdata, setProgramdata] = useState([]); //프로그램 데이터 전체 저장
    const [programlistdata, setProgramlistdata] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [userlistdata, setUserlistdata] = useState([]);
    const [userprogramdata, setUserprogramdata] = useState([]);
    const [programtype, setProgramtype] = useState([]);
    const [state, setState] = useState({});
    const [searchstate, setSearchstate] = useState({});
    const [programId, setProgramId] = useState("");
    const [userId, setUserId] = useState("");
    const [availableProgram, setAvailableProgram] = useState([]);
    const [availableProgramList, setAvailableProgramList] = useState([]);

    const [a, setA] = useState(true);

    const [pmodal, setPmodal] = useState(false); //프로그램 추가 modal
    const [umodal, setUmodal] = useState(false); //사용자 추가 modal
    const [cmodal, setCmodal] = useState(false); //프로그램 등록 modal
    const [fmodal, setFmodal] = useState(false); //프로그램 등록 확인 modal
    const [epmodal, setEpmodal] = useState(false); //프로그램 수정 modal
    const [dpmodal, setDpmodal] = useState(false); //프로그램 삭제 modal

    /*프로그램 타입 선택*/
    const [ptype, setPtype] = useState(-1); //프로그램 타입 저장
    const [activeTab, setActiveTab] = useState('0');
    const toggleDrop = () => setDropdownOpen(prevState => !prevState);

    /*사용자 타입 선택*/
    const [utype, setUtype] = useState(-1); //사용자 타입 저장

    const tapToggle = async (tab) => {
        if (activeTab !== tab) await setActiveTab(tab);
    };

    let isOpen = () => {
        setOpen(!open);
    };

    /*해당 프로그램 목록 저장하는 함수*/
    let getProgramList = (e, t) => {
        setProgramlistdata([]);
        setPtype(t);

        if (t == -1) { //전체 클릭 경우
            setProgramlistdata(programdata);
        }
        else { //프로그램 타입 선택 경우
            let list = [];
            programdata.map((data, i) => {
                if (data.program_type == t) {
                    list.push(data);
                }
            })
            setProgramlistdata(list);
        }
    }

    /*프로그램 수정 및 삭제시 프로그램 데이터 업데이트*/
    useEffect((e) => {
            getProgramList(e, ptype);    
      }, [programdata])


    /*해당 사용자 목록 저장하는 함수*/
    let getUserList = (e, t) => {
        setUserlistdata([]);
        setUtype(t);

        if (t == -1) { //전체 클릭 경우
            setUserlistdata(userdata);
        }
        else { //내부 관리자 or 외부 관리자 선택 경우
            let list = [];
            userdata.map((data, i) => {
                if (data.type === t) {
                    list.push(data);
                }
            })
            setUserlistdata(list);
        }
    }

    /*랜덤 값*/
    let getUuid = () => {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (Math.random() * 16) | 0,
                v = 'x' ? r : r && 0x3 | 0x8;
            return v.toString(16).toUpperCase();
        });
    };

    /*Open 클릭시 프로그램 데이터 가져오는 함수 호출*/
    useEffect(() => {
        if (open === true) {
            getProgramdata();
            getUserdata();
            getProgramType();
        }
    }, [open]);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    /*Program or User 구분*/
    let changeType = (e, i) => {
        setType(i); //1=Program, 2=User
    }

    /*프로그램 데이터 가져오는 함수*/
    let getProgramdata = async () => {
        const response = await axios.post('api');
        setProgramdata(response.data.data.list);
        if(a === true){
            setProgramlistdata(response.data.data.list);
            setA(false);
        }
    }

    /*사용자 데이터 가져오는 함수*/
    let getUserdata = async () => {
        const response = await axios.post('api');
        setUserdata(response.data.data.list);
        setUserlistdata(response.data.data.list);
    }

    //저장되어있는 프로그램 타입 가져오는 함수 ex) 고혈압, 금연
    let getProgramType = async () => {
        await axios.post('api')
            .then((response) => {
                setProgramtype(response.data.ProgramType);
            })
    }

    /*modal 창 닫는 함수*/
    let xModal = (e) => {
        setPmodal(false);
        setUmodal(false);
        setCmodal(false);
        setFmodal(false);
        setEpmodal(false);
        setDpmodal(false);
    }

    /*입력값으로 받은 state값을 저장하기 위해 사용하는 handler*/
    let onChangehandler = (e) => {
        let { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    /*검색 창에서 입력받은 state값을 저장하기 위해 사용하는 handler*/
    let onChangeSearch = (e) => {
        let { name, value } = e.target;
        setSearchstate({
            ...searchstate,
            [name]: value,
        });
    }

    /*프로그램 목록 검색 버튼*/
    let onSerachProgram = (e) => {
        const filterprogramlist = programdata.filter((data) => {
            console.log(data.program_title.toLowerCase().includes(searchstate.name));
            return data.program_title.toLowerCase().includes(searchstate.name);
        });
        setProgramlistdata(filterprogramlist);
    }

    /*사용자 목록 검색 버튼*/
    let onSerachUser = (e) => {
        const filteruserlist = userdata.filter((data) => {
            console.log(data.adminId.toLowerCase().includes(searchstate.name));
            return data.adminId.toLowerCase().includes(searchstate.name);
        });
        setUserlistdata(filteruserlist);
    }

    /*등록 가능한 프로그램 목록 검색 버튼*/
    let onSerachAvailableProgram = (e) => {
        const filterprogramlist = availableProgram.filter((data) => {
            console.log(data.program_title.toLowerCase().includes(searchstate.name));
            return data.program_title.toLowerCase().includes(searchstate.name);
        });
        setAvailableProgramList(filterprogramlist);
    }

    /*프로그램 추가 toggle*/
    let onProgramSubmitToggle = (e) => {
        setPmodal(!pmodal);
        setState({
            ...state,
            "programId": getUuid()
        })
    }

    /*프로그램 추가 버튼*/
    let onProgramSubmit = async (e) => {
        let data = {
            "programId": state.programId,
            "program_type": Number(state.program_type),
            "stime": Number(new Date(state.stime).getTime() / 1000),
            "etime": Number(new Date(state.etime).getTime() / 1000),
            "program_title": state.program_title,
            "deleted": 0
        }

        await axios.post('api', JSON.stringify(data)).then((res) => {
            console.log(res);
            getProgramdata();
            xModal();
        });
    }

    /*사용자 추가 toggle*/
    let onUserSubmitToggle = (e) => {
        setUmodal(!umodal);
    }

    /*사용자 추가 버튼*/
    let onUserSubmit = async (e) => {
        let data = {
            "id": state.id,
            "pw": state.pw,
            "type": Number(state.type),
            "activate": Number(new Date(state.activate).getTime() / 1000)
        }

        await axios.post('api', JSON.stringify(data)).then((res) => {
            console.log(res);
            getUserdata();
            xModal();
        });
    }

    /*선택 가능한 프로그램 데이터 가져오는 함수*/
    let onAvailableProgram = async (adminId) => {
        let data = {
            "adminId": adminId,
        }
        setUserId(adminId);

        await axios.post('api', JSON.stringify(data)).then((res) => {
            console.log(res);
            setAvailableProgram(res.data.data.list);
            setAvailableProgramList(res.data.data.list);
        });
    }

    /*프로그램 등록 toggle*/
    let connectProgramToggle = (e, data) => {
        setAvailableProgramList([]);
        setCmodal(!cmodal);
        onAvailableProgram(data);

    }

    /*프로그램 등록 버튼*/
    let connectProgram = async (e) => {
        let data = {
            "id": userId,
            "programId": programId,
            "headcount": Number(state.headcount)
        }

        await axios.post('api', JSON.stringify(data)).then((res) => {
            console.log(res);
            xModal();
        });
    }

    /*선택한 프로그램 ID 저장하는 함수*/
    let storeProgramId = (e, data) => {
        setProgramId(data);
    }

    /*등록된 프로그램 확인 toggle */
    let checkProgramToggle = async (e, data) => {
        setFmodal(!fmodal);

        await axios.post('api', JSON.stringify({ "adminId": data })).then((res) => {
            console.log(res);
            setUserprogramdata(res.data.data.list);
        });
    }

    /*프로그램 수정 toggle*/
    let editProgramToggle = (e, data) => {
        setEpmodal(!epmodal);
        setState({
            "programId": data.programId,
            "program_type": data.program_type,
            "stime": new Date(data.stime * 1000).toISOString().split('T')[0],
            "etime": new Date(data.etime * 1000).toISOString().split('T')[0],
            "program_title": data.program_title,
            "deleted": data.deleted
        })
    }

    /*프로그램 수정 버튼*/
    let editProgram = async (e) => {
        let data = {
            "programId": state.programId,
            "program_type": Number(state.program_type),
            "stime": Number(new Date(state.stime).getTime() / 1000),
            "etime": Number(new Date(state.etime).getTime() / 1000),
            "program_title": state.program_title,
            "deleted": state.deleted
        }
        await axios.post('api', JSON.stringify(data)).then((res) => {
            console.log(res);
            getProgramdata();
            xModal();
        });
    }

    /*프로그램 삭제 toggle*/
    let deleteProgramToggle = (e, data) => {
        setDpmodal(!dpmodal);
        //삭제
        if (data.deleted === 1) {
            setState({
                "programId": data.programId,
                "program_type": data.program_type,
                "stime": data.stime,
                "etime": data.etime,
                "program_title": data.program_title,
                "deleted": 0
            })

        }
        //삭제 취소
        else if (data.deleted === 0) {
            setState({
                "programId": data.programId,
                "program_type": data.program_type,
                "stime": data.stime,
                "etime": data.etime,
                "program_title": data.program_title,
                "deleted": 1
            })

        }
    }

    /*프로그램 삭제 버튼*/
    let deleteProgram = async (e) => {
        let data;
        //삭제
        if (state.deleted === 1) {
            data = {
                "programId": state.programId,
                "program_type": Number(state.program_type),
                "stime": state.stime,
                "etime": state.etime,
                "program_title": state.program_title,
                "deleted": 1
            }

        }
        //삭제 취소
        else if (state.deleted === 0) {
            data = {
                "programId": state.programId,
                "program_type": Number(state.program_type),
                "stime": state.stime,
                "etime": state.etime,
                "program_title": state.program_title,
                "deleted": 0
            }
        }

        await axios.post('api', JSON.stringify(data)).then((res) => {
            console.log(res);
            getProgramdata();
            xModal();
        });
    }

    return (
        <Card>
            <CardHeader>
                <FlexBox>
                    ProgramUser{' '}
                    <RightButton>
                        <Button onClick={(e) => isOpen()}>OPEN</Button>
                    </RightButton>
                </FlexBox>
            </CardHeader>
            <Collapse isOpen={open}>
                <CardBody >
                    <Hei1000 style={{ height: "1000px" }}>
                        <Row>
                            <Col>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink onClick={(e) => {
                                            changeType(e, 1);
                                        }}>Program</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={(e) => {
                                            changeType(e, 2);
                                        }}>User</NavLink>
                                    </NavItem>
                                </Nav>

                                {/*Program*/}
                                {type === 1 ?
                                    <div>
                                        <Button style={{fontFamily:"Jua"}} className="programUserbutton" color="primary" onClick={(e) => onProgramSubmitToggle(e)}>프로그램 추가</Button>
                                        <Nav tabs>
                                            <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
                                                <DropdownToggle style={{ width: "125px" }} className="programlist" caret>프로그램 종류</DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem header>프로그램 종류</DropdownItem>
                                                    <div style={{ height: '220px', overflow: 'auto' }} >
                                                        <DropdownItem className={classnames({
                                                            active: activeTab === (0).toString(),
                                                        })}
                                                            onClick={(e) => {
                                                                tapToggle((0).toString());
                                                                getProgramList(e, -1);
                                                            }}>전체</DropdownItem>
                                                        <DropdownItem divider />
                                                        {programtype.map((data, i) => {
                                                            return (
                                                                <DropdownItem key={i} className={classnames({
                                                                    active: activeTab === (i + 1).toString(),
                                                                })}
                                                                    onClick={(e) => {
                                                                        tapToggle((i + 1).toString());
                                                                        getProgramList(e, data.program_type);
                                                                    }}>
                                                                    {programtype[i].program_explan}
                                                                </DropdownItem>
                                                            );
                                                        })}
                                                    </div>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </Nav>
                                        <button className="searchbt" onClick={(e) => onSerachProgram(e)}>검색</button>
                                        <input className="search" type="text" name="name" onChange={(e) => onChangeSearch(e)} />

                                        {ptype === -1 ? <div className="programUsertitle">프로그램 목록 - 전체</div> : programtype.map((data, i) => {
                                            if (ptype === data.program_type) {
                                                return <div key={i} className="programUsertitle">프로그램 목록 - {data.program_explan}</div>
                                            }
                                        })}
                                        <div>{programlistdata.map((data, i) => {
                                            if (i % 2 === 1) {

                                                return (<ProgramBoxRight key={i}>
                                                    {data.deleted === 1 ? <span style={{ color: "red", fontFamily: "Jua", float: "right", marginRight: "3%" }}>삭제</span> : ""}
                                                    <div className="ptype1">제목: <span>{data.program_title}</span></div>
                                                    <p className="ptype">프로그램 타입: <span>{data.program_type === 1 ? <span>고혈압</span> : data.program_type === 2 ? "금연" : " "}</span></p>
                                                    <p className="ptype">계약 기간: <span className="ptype4">{new Date(data.stime * 1000).toISOString().split('T')[0]} ~ {new Date(data.etime * 1000).toISOString().split('T')[0]}</span></p>

                                                    <div className="ubtbox">
                                                        <button className="pdbutton" onClick={(e) => editProgramToggle(e, data)}>수정</button>
                                                        {data.deleted === 1 ? <button className="pdbutton1" onClick={(e) => deleteProgramToggle(e, data)}>삭제취소</button> : <button className="pdbutton1" onClick={(e) => deleteProgramToggle(e, data)}>삭제</button>}

                                                    </div>

                                                </ProgramBoxRight>
                                                )
                                            }
                                            else {
                                                return <ProgramBox key={i}>
                                                    {data.deleted === 1 ? <span style={{ color: "red", fontFamily: "Jua", float: "right", marginRight: "3%" }}>삭제</span> : ""}
                                                    <div className="ptype1">제목: <span>{data.program_title}</span></div>
                                                    <p className="ptype">프로그램 타입: <span>{data.program_type === 1 ? <span>고혈압</span> : data.program_type === 2 ? "금연" : " "}</span></p>
                                                    <p className="ptype">계약 기간: <span className="ptype4">{new Date(data.stime * 1000).toISOString().split('T')[0]} ~ {new Date(data.etime * 1000).toISOString().split('T')[0]}</span></p>

                                                    <div className="ubtbox">
                                                        <button className="pdbutton" onClick={(e) => editProgramToggle(e, data)}>수정</button>
                                                        {data.deleted === 1 ? <button className="pdbutton1" onClick={(e) => deleteProgramToggle(e, data)}>삭제취소</button> : <button className="pdbutton1" onClick={(e) => deleteProgramToggle(e, data)}>삭제</button>}
                                                    </div>
                                                </ProgramBox>
                                            }
                                        }
                                        )}
                                        </div>
                                    </div>

                                    /*User*/
                                    : type === 2 ?
                                        <div>
                                            <Button style={{fontFamily:"Jua"}} className="programUserbutton" color="primary" onClick={(e) => onUserSubmitToggle(e)}>User 추가</Button>
                                            <Nav tabs>
                                                <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
                                                    <DropdownToggle style={{ width: "125px" }} className="programlist" caret>사용자 종류</DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem header>사용자 종류</DropdownItem>
                                                        <div style={{ height: '220px', overflow: 'auto' }} >
                                                            <DropdownItem onClick={(e) => {
                                                                getUserList(e, -1);
                                                            }}>전체</DropdownItem>
                                                            <DropdownItem divider />
                                                            <DropdownItem onClick={(e) => {
                                                                getUserList(e, 1);
                                                            }}>내부 관리자</DropdownItem>
                                                            <DropdownItem onClick={(e) => {
                                                                getUserList(e, 0);
                                                            }}>외부 관리자</DropdownItem>
                                                        </div>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </Nav>
                                            <button className="searchbt" onClick={(e) => onSerachUser(e)}>검색</button>
                                            <input className="search" type="text" name="name" onChange={(e) => onChangeSearch(e)} />
                                            {utype === -1 ? <div className="programUsertitle">사용자 목록 - 전체</div> : utype === 1 ? <div className="programUsertitle">사용자 목록 - 내부 관리자</div> : utype === 0 ? <div className="programUsertitle">사용자 목록 - 외부 관리자</div> : ""}

                                            <div>{userlistdata.map((data, i) => {
                                                if (i % 2 === 1) {
                                                    return <UserBoxRight key={i}>
                                                        {data.type === 1 ? <span className="admin">내부 관리자</span> : data.type === 0 ? <span className="oadmin">외부 관리자</span> : ""}
                                                        
                                                        <p className="utype1"><span className="adid">ID</span><span className="idv">{data.adminId}</span></p>
                                                        <p className="utype"><span className="adpw">PW</span><span className="pwv">{data.adminPW}</span></p>

                                                        <p className="utype2">계약 종료 날짜 <span className="ptye3">{new Date(data.activate * 1000).toISOString().split('T')[0]}</span></p>

                                                        <div className="ubtbox">
                                                            <button className="pdbutton" onClick={(e) => connectProgramToggle(e, data.adminId)}>프로그램 등록</button>
                                                            <button className="pdbutton1" onClick={(e) => checkProgramToggle(e, data.adminId)}>프로그램 확인</button>
                                                        </div>
                                                    </UserBoxRight>
                                                }
                                                else {
                                                    return <UserBox key={i}>
                                                       {data.type === 1 ? <span className="admin">내부 관리자</span> : data.type === 0 ? <span className="oadmin">외부 관리자</span> : ""}
                                                        <p className="utype1"><span className="adid">ID</span><span className="idv">{data.adminId}</span></p>
                                                        <p className="utype"><span className="adpw">PW</span><span className="pwv">{data.adminPW}</span></p>


                                                        <p className="utype2">계약 종료 날짜 <span className="ptye3">{new Date(data.activate * 1000).toISOString().split('T')[0]}</span></p>

                                                        <div className="ubtbox">
                                                            <button className="pdbutton" onClick={(e) => connectProgramToggle(e, data.adminId)}>프로그램 등록</button>
                                                            <button className="pdbutton1" onClick={(e) => checkProgramToggle(e, data.adminId)}>프로그램 확인</button>
                                                        </div>
                                                    </UserBox>
                                                }
                                            }
                                            )}
                                            </div>
                                        </div>
                                        : ""}

                                {/*프로그램 추가 Modal*/}
                                <Modal isOpen={pmodal}>
                                    <ModalHeader><span className="dmodalheader">프로그램 추가</span></ModalHeader>
                                    <ModalBody>
                                        <Box>
                                            <p className="attr">프로그램 제목</p>
                                            <Input type="text" name="program_title" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">프로그램 타입</p>
                                            <Input type="select" name="program_type" onChange={(e) => onChangehandler(e)}>
                                                <option>선택해주세요.</option>
                                                <option value='1'>고혈압</option>
                                                <option value='2'>금연</option>
                                            </Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">시작 날짜</p>
                                            <Input type="date" name="stime" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">종료 날짜</p>
                                            <Input type="date" name="etime" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >취소</Button>
                                            <Button color="primary" className="tsubmit" onClick={(e) => onProgramSubmit(e)}>확인</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                {/*사용자 추가 Modal*/}
                                <Modal isOpen={umodal}>
                                    <ModalHeader><span className="dmodalheader">사용자 추가</span></ModalHeader>
                                    <ModalBody>
                                        <Box>
                                            <p className="attr">관리자 ID</p>
                                            <Input type="text" name="id" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">관리자 PASSWORD</p>
                                            <Input type="text" name="pw" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">관리자 유형</p>
                                            <Input type="select" name="type" onChange={(e) => onChangehandler(e)}>
                                                <option disabled> </option>
                                                <option value='1'>내부 관리자</option>
                                                <option value='0'>외부 관리자</option></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">계약 종료 날짜</p>
                                            <Input type="date" name="activate" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >취소</Button>
                                            <Button color="primary" className="tsubmit" onClick={(e) => onUserSubmit(e)}>확인</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                               {/*프로그램 등록 Modal*/}
                               <Modal isOpen={cmodal}>
                                    <ModalHeader><span className="dmodalheader">프로그램-사용자 등록</span></ModalHeader>
                                    <ModalBody>
                                        <Box>
                                            <p className="attr">최대 사용자 수</p>
                                            <Input type="text" name="headcount" onChange={(e) => onChangehandler(e)}></Input>
                                        </Box>

                                        <ListBox>
                                            <p className="attr">프로그램 리스트</p>
                                            <button className="searchbt1" onClick={(e) => onSerachAvailableProgram(e)}>검색</button>
                                            <InputGroup style={{ width: "380px", marginBottom: "10px" }}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>제목</InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="inputserach" type="text" name="name" onChange={(e) => onChangeSearch(e)} />
                                            </InputGroup>
                                            { programtype.map((protype,j)=>
                                            { 
                                                return(
                                                <div key={j}><p className="listp2">{protype.program_explan} 리스트</p>
                                                {availableProgramList.map((data, i) =>
                                                    (
                                                    <div key={i}>
                                                        <div>{data.program_type === protype.program_type ?<div>
                                                        {data.adminId === null&&data.deleted===0 ? <div><button className="programlistbtnull" key={i} onClick={(e) => storeProgramId(e, data.programId)}>
                                                        <p className="attrname">{data.program_title}</p>
                                                        
                                                        <p style={{fontFamily:"Jua"}}>기간  <span className="ptype3">{new Date(data.stime * 1000).toISOString().split('T')[0]} ~ {new Date(data.etime * 1000).toISOString().split('T')[0]}</span></p>
                                                    </button></div> :data.deleted===0? <div><button className="programlistbt" key={i} onClick={(e) => storeProgramId(e, data.programId)} disabled>
                                                            <p className="attrname">{data.program_title}</p>
                                                            <p style={{fontFamily:"Jua"}}>기간  <span className="ptype3">{new Date(data.stime * 1000).toISOString().split('T')[0]} ~ {new Date(data.etime * 1000).toISOString().split('T')[0]}</span></p>
                                                        </button></div>:""}</div>: ""}</div>
                                                    </div>
                                                            
                                                ))}

                                            </div>
                                            )
                                            }
                                                
                                                   
                                            )}
                                        </ListBox>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >취소</Button>
                                            <Button color="primary" className="tsubmit" onClick={(e) => connectProgram(e)}>확인</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                {/*프로그램 등록 확인 Modal*/}
                                <Modal isOpen={fmodal}>
                                    <ModalHeader><span className="dmodalheader">등록된 프로그램 확인</span></ModalHeader>
                                    <ModalBody>
                                        <div>{userprogramdata.map((data, i) => {
                                            return (
                                                programdata.map((pd, j) => (

                                                    <div key={j}>
                                                        {/*data.deleted===1?<div className="programuserlist" key={i} onClick={(e) => storeProgramId(e, data.programId)}>
                                                          <p className="attrname">프로그램이 삭제되었습니다.</p>
                                                      </div>:*/}
                                                        {data.deleted === 0 && pd.programId === data.programId ?
                                                            <div className="attdiv">
                                                                <p className="attrname1">프로그램 타입 : {pd.program_type === 1 ? "고혈압" : "금연"}</p>
                                                                <p className="attrname1">프로그램 제목 : {pd.program_title}</p>
                                                                <p className="attrname1">인원 수: {data.headcount}명</p>

                                                            </div> : ""}
                                                    </div>
                                                )
                                                )
                                            )
                                        })}</div>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >취소</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                {/*프로그램 수정 Modal*/}
                                <Modal isOpen={epmodal}>
                                    <ModalHeader><span className="dmodalheader">프로그램 수정</span></ModalHeader>
                                    <ModalBody>
                                        <Box>
                                            <p className="attr">프로그램 제목</p>
                                            <Input type="text" name="program_title" onChange={(e) => onChangehandler(e)} value={state.program_title}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">프로그램 타입</p>
                                            <Input type="select" name="program_type" onChange={(e) => onChangehandler(e)} value={state.program_type}>
                                                <option>선택해주세요.</option>
                                                <option value='1'>고혈압</option>
                                                <option value='2'>금연</option>
                                            </Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">시작 날짜</p>
                                            <Input type="date" name="stime" onChange={(e) => onChangehandler(e)} value={state.stime}></Input>
                                        </Box>

                                        <Box>
                                            <p className="attr">종료 날짜</p>
                                            <Input type="date" name="etime" onChange={(e) => onChangehandler(e)} value={state.etime}></Input>
                                        </Box>

                                        <div className="deletesurveyBtn">
                                            <Button color="secondary" className="tsubmit" onClick={(e) => xModal()} >취소</Button>
                                            <Button color="primary" className="tsubmit" onClick={(e) => editProgram(e)}>확인</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                {/*프로그램 삭제 modal*/}
                                <Modal isOpen={dpmodal}>
                                    <ModalHeader>{state.deleted === 0 ? <span className="dmodalheader">프로그램 삭제 취소</span> : <span className="dmodalheader">프로그램 삭제</span>}</ModalHeader>
                                    <ModalBody>
                                        {state.deleted === 0 ? <p className="dmodalbody">해당 프로그램을 정말 삭제취소 하시겠습니까?</p> : <p className="dmodalbody">해당 프로그램을 정말 삭제하시겠습니까?</p>}

                                        <div className="deletesurveyBtn">
                                            <Button style={{ marginRight: "5px" }} color="primary" onClick={(e) => deleteProgram(e)}>Yes</Button>
                                            <Button color="secondary" onClick={(e) => xModal()} >No</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>

                            </Col>
                        </Row>
                    </Hei1000>
                </CardBody>
            </Collapse>
        </Card>
    );
};

export default ProgramUser;