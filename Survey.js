import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import classnames from 'classnames';
import '../App.css';
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
import { render } from '@testing-library/react';
import { undef } from '@redux-saga/is';

const Ggs = styled.div`
  padding: 1rem 1rem;
`;
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
const Hei = styled.div`
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

const BottomLine = styled.div`
  height:auto;
  border-bottom:3px solid rgb(100,180,200);
  margin-bottom:2%;
`

const Box = styled.div`
  border: 1.5px solid rgb(221, 221, 221);;
  border-radius: 7px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: white;
`;
const Bt = styled.div`
  float: right;
  `;

const Survey = () => {

  axios.defaults.headers.common = { Accept: 'application/x-www-form-urlencoded, text/plain, \*/*' };

  const [open, setOpen] = useState(false);
  const [surveySelect, setsurveySelect] = useState([]);
  const [surveyQuestion, setsurveyQuestion] = useState([]);
  const [qestionType, setQuestiontype] = useState(-1);

  const [state, setState] = useState([]);
  const [questiondata, setQuestiondata] = useState('0');
  const [modal, setModal] = useState(false);
  const [smodal, setSmodal] = useState(false);
  const [activeTab, setActiveTab] = useState('0');
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeQ, setFadeQ] = useState(true);
  const [sinput, setSinput] = useState({});

  const [qmodal, setQmodal] = useState(false);
  const [arr, setArr] = useState([0,]);
  const [qinput, setQinput] = useState({});
  const [cnt, setCnt] = useState(0);

  const [sDmodal, setSDmodal] = useState(false);

  const [answerType, setAnswerType] = useState('');
  const [origin, setOrigin] = useState('');

  const [qDmodal, setQdmodal] = useState(false);
  const [delqstate, setDelqstate] = useState([]);

  const [a, setA] = useState(false);
  const [number, setNumber] = useState(0);

  const [b, setB] = useState(false);
  const [array, setArray] = useState([]);

  const [typenum, setTypenum] = useState([]);
  const [tmp, setTmp] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const toggleInput = () => setSmodal(!smodal);

  const toggleQuestion = (data, e) => {
    setQmodal(!qmodal);
    setState({
      "survey_id": data.survey_id,
      "type1": 1,
    })
    setArr([0,]);
  }

  const toggleSurvey = (e) => {
    setSDmodal(!sDmodal);
  }

  const toggleDeleteSurvey = (data, e) => {
    setSDmodal(true);
    setState({
      survey_id: data.survey_id,
      program_type: data.program_type,
      creator: data.creator,
      title: data.title,
      survey_delete: 1,
    })
  }

  let get = async () => {
    const response = await axios.post('api');
    setsurveySelect(response.data.survey);
  }

  let getQuest = async (id) => {
    setQuestiondata(id);
    setState({
      survey_id: id
    })
  }

  useEffect(() => {
    if (questiondata !== '0') {
      getQuestion();
    }
  }, [questiondata])

  let getQuestion = async () => {
    let parameter;
    parameter = { surveyid: questiondata }

    axios.post('api', JSON.stringify(parameter))
      .then((res) => { setsurveyQuestion(res.data.question); })
  }

  const fadeToggle = () => setFadeIn(!fadeIn);
  const fadeQtoggle = () => setFadeQ(!fadeQ);

  const tapToggle = async (tab) => {
    if (activeTab !== tab) await setActiveTab(tab);
  };

  let modifyToggle = (data, e) => {
    setModal(!modal);
    if (data.question_type !== 1) {
      setTypenum([]);
    }

    setState({
      "type1": JSON.parse(data.question_choice).length,
      "survey_id": data.survey_id,
      "question_id": data.question_id,
      "question_txt": data.question_txt,
      "question_choice": data.question_choice,
      "isDual": data.isDual,
      "question_type": data.question_type,
      "question_seq": data.question_seq,
      "answer_type": data.answer_type,
      "creator": data.creator,
      "timestamp": new Date(),
    })
    setTypenum(JSON.parse(data.question_choice))
    setB(true);
  }

  let xModal = () => {
    //getQuestion();
    setModal(false);
    setQmodal(false);
    setSDmodal(false);
    setQdmodal(false);
    setSmodal(false);
  }

  let onChangehandler = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };



  let modifyPost = async () => {

    
    let choiceStr = [];
    choiceStr = typenum;

    surveyQuestion.map((data, i) => {
      if (data.question_id === state.question_id) {
        surveyQuestion[i] = state;
        xModal();
      }
    })

    surveySelect.map((data, i) => (
      data.survey_id === state.survey_id ? setState({ ...state, "program_type": data.program_type, "title": data.title, }) : ""
    ))
    let data2 = {
      survey_id: state.survey_id,
      creator: state.creator,
      question_id: state.question_id,
      question_txt: state.question_txt,
      question_choice: JSON.stringify(choiceStr),
      isDual: Number(state.isDual),
      question_type: Number(state.question_type),
      question_seq: Number(state.question_seq),
      answer_type: Number(state.answer_type),
      question_delete: 0
    }
    await axios.post('api', JSON.stringify(data2)).then((res) => { console.log(res) });
    getQuestion();
  }


  let getTime = (time) => {
    let date = new Date(time * 1000 + 3600 * 9 * 1000).toISOString();
    return date;
  }

  useEffect(() => {
    if (open === true) {
      get();
    }
  }, [open]);

  let getUuid = () => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = 'x' ? r : r && 0x3 | 0x8;
      return v.toString(16).toUpperCase();
    });
  };

  let isOpen = () => {
    setOpen(!open);
  };

  let typenumhandler = (e) => {
    let { name, value } = e.target;
    typenum.splice(name.replace("typenum", ""), 1, value);
    setState({
      ...state,
      "question_choice":JSON.stringify(typenum),
    })

  }

  /*질문 추가 + 버튼*/
  let onAddNumsubmit = async (e) => {
    let tmp = [];
    for (let i = 0; i < state.type1; i++) {
      tmp.push("");
    }
    setArr(tmp)
  }

  /*질문 수정 + 버튼*/
  let onNumsubmit = async (e) => {
    setTypenum([]);
    let tmp = JSON.parse(state.question_choice);
    tmp.push("");

    setState({ ...state, "question_choice": JSON.stringify(tmp), "type1": Number(tmp.length) });
    setTypenum(tmp);
  }
  /*질문 수정 - 버튼*/
  let onNumsubmit1 = async (e) => {
    setTypenum([]);
    let tmp = JSON.parse(state.question_choice);
    tmp.splice(JSON.parse(state.question_choice).length - 1, 1);
    setState({ ...state, "question_choice": JSON.stringify(tmp), "type1": Number(tmp.length) });
    setTypenum(tmp);
  }

  let onSubmitQuestion = async (e) => {
    //insert question
    let value=true;

    if(state.question_type===1||state.question_type==='1'||state.question_type===4||state.question_type==='4'){
      for (let i = 0; i < state.type1; i++) {
        if(state['typenum' + i]===undefined){
          value=false;
        }
      }

    }
    
    if(state.question_txt === undefined || state.question_type === undefined  ||value===false|| state.isDual === undefined || state.answer_type === undefined){
      alert("값을 모두 입력해주세요");
    }
    else{
    
      let choiceStr = [];
  
      if(state.question_type===1||state.question_type==='1'||state.question_type===4||state.question_type==='4'){
        for (let i = 0; i < state.type1; i++) {
          choiceStr.push(state['typenum' + i])
        }

      }

      if((state.question_type===1||state.question_type==='1')&&choiceStr.length<2){
        alert("객관식 답은 두개 이상이어야 합니다.");
      }
      else{
      let id = getUuid();
      let arr =surveyQuestion;
      let max=0;
      for(let i=0;i<surveyQuestion.length;i++){
        if(arr[i].question_seq>max){
          max=arr[i].question_seq;
        }
      }
  
      let data3 = {
        survey_id: state.survey_id,
        creator: sessionStorage.getItem('id'),
        question_id: id,
        question_txt: state.question_txt,
        question_choice: JSON.stringify(choiceStr),
        isDual: Number(state.isDual),
        question_type: Number(state.question_type),
        question_seq: max+1,
        answer_type: Number(state.answer_type),
        question_delete: 0
      }
    
      axios.post('api', JSON.stringify(data3))
        .then((res) => {
          console.log(res);
          let data4 = {
            answer_type: state.answer_type,
            creator: sessionStorage.getItem('id'),
            question_choice: JSON.stringify(choiceStr),
            question_id: id,
            quesion_seq: max+1,
            question_txt: state.question_txt,
            question_type: Number(state.question_type),
            survey_id: state.survey_id,
            timestamp: new Date(),
          }
        
          surveyQuestion[surveyQuestion.length] = data4;
          xModal();
          getQuestion();
      })
    }
    }
  }

  let onSubmit = async () => {
    if (sinput.program_type === undefined || sinput.title === undefined) {
      alert("값을 모두 입력해주세요");
    }

    //insert survey
    let data1 = {
      survey_id: getUuid(),
      program_type: Number(sinput.program_type),
      creator: sessionStorage.getItem('id'),
      title: sinput.title,
      survey_delete: 0,
    }
    axios.post('api', JSON.stringify(data1))
      .then((res) => {
        console.log(res);
        xModal();
        get();
      })
  };

  let onQsubmit = async () => {

    let choiceStr = [];
    for (let i = 0; i < state.type1; i++) {
      choiceStr.push(state['typenum' + i])
    }

  }

  let jonChangehandler = (e) => {
    let { name, value } = e.target;

    setSinput({
      ...sinput,
      [name]: value,
    });

  };

  let deleteSurvey = (e) => {

    let data5 = {
      survey_id: state.survey_id,
      program_type: state.program_type,
      creator: state.creator,
      title: state.title,
      survey_delete: 1,
    }

    axios.post('api', JSON.stringify(data5))
      .then((res) => {
        console.log(res);
        xModal();
        get();
      })
  };

  let questionDeleteToggle = (data, e) => {

    setQdmodal(!qDmodal)
    setDelqstate({
      "survey_id": data.survey_id,
      "creator": data.creator,
      "question_id": data.question_id,
      "question_txt": data.question_txt,
      "question_choice": data.question_choice,
      "isDual": data.isDual,
      "question_type": data.question_type,
      "question_seq": data.question_seq,
      "answer_type": data.answer_type,
      "qeustion_delete": 1,
    })
  };

  let questionDelete = async (e) => {

    let deleteData = {
      survey_id: delqstate.survey_id,
      creator: delqstate.creator,
      question_id: delqstate.question_id,
      question_txt: delqstate.question_txt,
      question_choice: delqstate.question_choice,
      isDual: delqstate.isDual,
      question_type: delqstate.question_type,
      question_seq: delqstate.question_seq,
      answer_type: delqstate.answer_type,
      question_delete: Number(1),
    }
    await axios.post('api', JSON.stringify(deleteData))
      .then((res) => {
        console.log(res);
        xModal();
        getQuestion();
      });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <FlexBox>
            Survey{' '}
            <RightButton>
              <Button onClick={(e) => isOpen()}>OPEN</Button>
            </RightButton>
          </FlexBox>
        </CardHeader>
        <Collapse isOpen={open}>

          <Card style={questiondata === "0" ? { paddingBottom: "35%" } : { paddingBottom: "20%" }} >
            <CardBody>
              <Row>
                <Col lg="12">
                  <Nav tabs>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle className="surveylist" caret>
                        설문지 리스트
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>설문지 리스트</DropdownItem>
                        <div style={{ height: '220px', overflow: 'auto' }} >
                          {surveySelect.map((data, i) => {

                            return (
                              <DropdownItem key={i} className={classnames({
                                active: activeTab === (i + 1).toString(),
                              })}
                                onClick={(e) => {
                                  tapToggle((i + 1).toString());
                                  getQuest(data.survey_id);
                                }}>
                                {surveySelect[i].title}
                              </DropdownItem>
                            );
                          })}
                        </div>
                      </DropdownMenu>
                    </Dropdown>

                    <div className="asbtn"><button className="addsurvey" onClick={toggleInput} color="primary" >설문추가</button></div>
                    {/*설문지 추가 버튼*/}
                    <div className="addsurveyBtn">

                      <Modal isOpen={smodal} toggle={toggleInput}>
                        <ModalHeader ><span className="insertsurveyform">설문 추가</span></ModalHeader>
                        <ModalBody>
                          <Box>
                            <p className="t">프로그램 타입</p>
                            <Input type="select" name="program_type" onChange={(e) => jonChangehandler(e)}>
                              <option>선택해주세요.</option>
                              <option value='1'>고혈압</option>
                              <option value='2'>금연</option>
                            </Input>
                          </Box>             
                          <Box>
                            <p className="t">설문지 제목</p>
                            <Input type="text" name="title" onChange={(e) => jonChangehandler(e)}></Input>
                          </Box>
                          <div className="submitBt" ><Button style={{fontFamily:"Jua"}} type="submit" color="secondary" onClick={(e) => xModal(e)}>취소</Button></div>
                          <div className="submitBt" ><Button style={{fontFamily:"Jua"}} type="submit" color="primary" onClick={(e) => onSubmit(e)}>추가</Button></div>
                          

                        </ModalBody>
                      </Modal>
                    </div>
                  </Nav>
                  {surveySelect.map((datafirst, i) => {
                    return (
                      <TabContent activeTab={activeTab} key={i}>
                        <TabPane tabId={(i + 1).toString()}>

                          <button className="details" onClick={fadeToggle}>Details</button>
                          <button className="deleteBtn" onClick={(e) => toggleDeleteSurvey(datafirst, e)} >설문 삭제</button>
                          <button className="addquestionBtn" onClick={(e) => toggleQuestion(datafirst, e)} color="primary">질문 추가</button>

                          <Fade in={fadeIn} tag="h6" className="mt-3">
                            <div className="surveytitle">{surveySelect[i].title}</div>
                            <Row>

                              <Card body className="card1">
                                <Col >
                                  <CardTitle className="cardtitle1" tag="h6">작성자</CardTitle>
                                  <CardText className="cardtext1">{surveySelect[i].creator}</CardText>
                                </Col>
                              </Card>
                              <Card body className="card2">
                                <Col >
                                  <CardTitle className="cardtitle2" tag="h6">설문지 종류</CardTitle>
                                  <CardText className="cardtext2">

                                    {surveySelect[i].program_type === 1 ? (
                                      "고혈압에 관한 설문입니다."
                                    ) : (
                                        "금연에 관한 설문입니다."
                                      )}
                                  </CardText>
                                </Col>
                              </Card>
                              <Card body className="card3">
                                <Col >
                                  <CardTitle className="cardtitle3" tag="h6">수정 시간</CardTitle>
                                  <CardText className="cardtext3">
                                    {getTime(surveySelect[i].timestamp).substr(0, 10)}
                                    &nbsp;&nbsp;
                                      {getTime(surveySelect[i].timestamp).substr(11, 18).replace(".000Z", "")}
                                  </CardText>
                                </Col>
                              </Card>
                            </Row>
                          </Fade>

                          <Row >

                            <Col lg="12">

                              <Card className="cardbody" body outline color="link">

                                <div className="questions">질문</div>
                                {/*question이 여러개 들어오면 여기서 Qestion을 map돌려서 받아낼 예정*/}
                                {/*<Fade in={fadeQ} tag="h6" className="mt-3">*/}
                                {surveyQuestion.map((data, i) => (
                                  <div className="questionlist" tag="h6" color="info" key={i}>
                                    

                                    <div className="bagefirst"><span className="bagenum"><Badge color="secondary">{i + 1}</Badge></span><span className="bageinfo"><Badge color="light">{data.question_type === 1 ? '객관식' : data.question_type === 2 ? "주관식" : data.question_type === 3 ? "O/X" : data.question_type === 4 ? "단답식" : "null"}</Badge><Badge color="light">{data.answer_type === 1 ? "숫자" : data.answer_type === 2 ? "문자" : data.answer_type === 3 ? "다중 선택" : data.answer_type === 4 ? "O/X" : "null"}</Badge></span></div>

                                    <div className="questionInfo">
                                      <div className="questionTitle">{data.question_txt}</div>
                                      <Row>
                                        {JSON.parse(data.question_choice).map((data2, i) => (
                                          <div key={i}>{data.question_type === 4 && i === 0 ? <Col key={i} className="questCol" xs="auto" >
                                            <div className="questChoicevalueboss1"><div className="questChoicevalue1">{data2}</div></div>
                                          </Col> : data.question_type === 4 && i !== 0 ? <Col key={i} className="questCol" xs="auto" >
                                            <div className="questChoicevalueboss2"><div className="questChoicevalue2">{data2}</div></div>
                                          </Col> : data.question_type === 1 ? <Col key={i} className="questCol" xs="auto" >
                                            <div className="questChoicevalueboss"><div className="questChoicenum">{i + 1}</div><div className="questChoicevalue">{data2}</div></div>
                                          </Col> : ""}</div>
                                        ))}
                                      </Row>
                                      {data.question_type === 2 ? <div className="ju">주관식</div> : data.question_type === 3 ? <div><div className="o"><input type="radio" disabled></input> O</div><div className="x"><input type="radio" disabled></input> X</div></div> : ""}
                                    </div>
                                    <button className="deleteqBtn" onClick={(e) => questionDeleteToggle(data, e)} >삭제</button>
                                    <button className="modifyqBtn" onClick={(e) => modifyToggle(data, e)} >수정</button>
                                  </div>

                                ))}
                                {/*</Fade>*/}
                                {modal === true ? <Modal isOpen={modal}  >
                                  <ModalHeader ><div className="questionmodify">질문 수정</div></ModalHeader>
                                  <ModalBody>
                                    <Box>
                                      <p className="t">질문 제목</p>
                                      <Input type="text" name="question_txt" id="questiontextID" onChange={(e) => onChangehandler(e)} value={state.question_txt} />
                                    </Box>

                                    <Box>
                                      <p className="t">질문 유형</p>
                                      <Input type="select" name="question_type" onChange={(e) => onChangehandler(e)} value={state.question_type}>
                                        <option>선택해주세요. </option>
                                        <option value='1'>객관식</option>
                                        <option value='2'>주관식</option>
                                        <option value='3'>O / X</option>
                                        <option value='4'>단답식</option>
                                      </Input>
                                    </Box>

                                    {state.question_type === 1 || state.question_type === '1' || state.question_type === 4 || state.question_type === '4' ?
                                      <Box>
                                        <div><span className="t">답안지</span>

                                          <Bt>
                                            <Button type="submit" outline color="dark" onClick={(e) => onNumsubmit(e)}>+</Button>
                                            <Button type="submit" color="dark" onClick={(e) => onNumsubmit1(e)}>-</Button>
                                          </Bt>

                                          <div>{JSON.parse(state.question_choice).map((data, i) => (
                                            <Input key={i} type="text" name={"typenum" + `${i}`} onChange={(e) => typenumhandler(e)} defaultValue={data}></Input>
                                          ))
                                          }</div>

                                        </div></Box>
                                      : ""}

                                    <Box>
                                      <p className="t">다중선택 유무</p>
                                      <Input type="select" name="isDual" onChange={(e) => onChangehandler(e)} value={state.isDual}>
                                        <option>선택해주세요.</option>
                                        <option value='0'>단일 선택</option>
                                        <option value='1'>다중 선택</option>
                                      </Input>
                                    </Box>

                                    <Box>
                                      <p className="t">답 유형</p>
                                      <Input type="select" name="answer_type" onChange={(e) => onChangehandler(e)} value={state.answer_type}>
                                        <option>선택해주세요.</option>
                                        <option value='1'>숫자</option>
                                        <option value='2'>문자</option>
                                        <option value='3'>다중선택</option>
                                        <option value='4'>O / X</option>
                                      </Input>
                                    </Box>

                                  </ModalBody>
                                  <ModalFooter>
                                    <Button style={{fontFamily:"Jua"}} color="primary" onClick={(e) => modifyPost()}>수정</Button>{' '}
                                    <Button style={{fontFamily:"Jua"}} color="secondary" onClick={(e) => xModal()} >취소</Button>
                                  </ModalFooter>
                                </Modal> : <Modal isOpen={false}></Modal>}


                                {/*질문 추가 입력 폼*/}
                                {qmodal === true ? <Modal isOpen={qmodal}  >
                                  <ModalHeader ><span className="insertquestionform">질문 추가</span></ModalHeader>
                                  <ModalBody>
                                    <Box>
                                      <p className="t">질문 제목</p>
                                      <InputGroup>
                                        <Input type="text" name="question_txt" onChange={(e) => onChangehandler(e)}>
                                        </Input>
                                      </InputGroup>
                                    </Box>
                                    <Box>
                                      <p className="t">질문 형식</p>
                                      <InputGroup>
                                        <Input type="select" name="question_type" onChange={(e) => onChangehandler(e)}>
                                          <option disabled> </option>
                                          <option> </option>
                                          <option value='1'>객관식</option>
                                          <option value='2'>주관식</option>
                                          <option value='3'>O/X</option>
                                          <option value='4'>단답식</option>
                                        </Input>
                                      </InputGroup>
                                    </Box>
                                    {state.question_type === "1" || state.question_type === "4" ? <div><Box><p className="t">답 갯수</p>
                                      <InputGroup>
                                        <Input type="text" name="type1"  defaultValue={1} onChange={(e) => onChangehandler(e)} >
                                        </Input>
                                        <Button type="submit" color="primary" onClick={(e) => onAddNumsubmit(e)}>+</Button>
                                      </InputGroup>
                                      {arr.map((data, i) => {
                                        return (
                                          <InputGroup key={i} >
                                            <Input type="text" name={"typenum" + `${i}`} onChange={(e) => onChangehandler(e)} >
                                            </Input>
                                          </InputGroup>
                                        )
                                      })}
                                    </Box></div> : ""}


                                    <Box>
                                      <p className="t">다중선택 유무</p>
                                      <Input type="select" name="isDual" onChange={(e) => onChangehandler(e)}>
                                        <option>선택해주세요.</option>
                                        <option value='0'>단일 선택</option>
                                        <option value='1'>다중 선택</option></Input>
                                    </Box>

                                    <Box>
                                      <p className="t">답 유형</p>
                                      <Input type="select" name="answer_type" onChange={(e) => onChangehandler(e)}>
                                        <option>선택해주세요.</option>
                                        <option value='1'>숫자</option>
                                        <option value='2'>문자</option>
                                        <option value='3'>다중선택</option>
                                        <option value='4'>O / X</option>
                                      </Input>
                                    </Box>

                                    <Button style={{fontFamily:"Jua"}} type="submit" className="submitBt" color="secondary" onClick={(e) => xModal(e)}>취소</Button>
                                    <Button style={{fontFamily:"Jua"}} type="submit" className="submitBt" color="primary" onClick={(e) => onSubmitQuestion(e)}>추가</Button>
                                      
                                  
                                  </ModalBody>

                                </Modal> : <Modal isOpen={false}></Modal>}


                                {sDmodal === true ? <Modal isOpen={sDmodal}  >
                                  <ModalHeader ><span className="dmodalheader">설문 삭제</span></ModalHeader>
                                  <ModalBody>
                                    <p className="dmodalbody">해당 설문지를 정말 삭제하시겠습니까?</p>
                                    <div className="deletesurveyBtn">
                                      <Button style={{marginRight:"2px",fontFamily:"Jua"}} color="primary" onClick={(e) => deleteSurvey(e)}>삭제</Button>{' '}
                                      <Button style={{fontFamily:"Jua"}} onClick={(e) => xModal()}>취소</Button>
                                    </div>


                                  </ModalBody>
                                </Modal> : <Modal isOpen={false}></Modal>}

                                {qDmodal === true ? <Modal isOpen={qDmodal}>
                                  <ModalHeader ><span className="dmodalheader">질문 삭제</span></ModalHeader>
                                  <ModalBody>
                                    <p className="dmodalbody">해당 질문을 정말 삭제하시겠습니까?</p>
                                    <div className="deletesurveyBtn">
                                      <Button style={{marginRight:"2px",fontFamily:"Jua"}} color="primary" onClick={(e) => questionDelete(e)}>삭제</Button>
                                      <Button style={{fontFamily:"Jua"}} color="secondary" onClick={(e) => xModal()} >취소</Button>
                                    </div>
                                  </ModalBody>

                                </Modal> : <Modal isOpen={false}></Modal>}

                              </Card>

                            </Col>

                          </Row>
                        </TabPane>
                      </TabContent>
                    );
                  })}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Collapse>
      </Card>





    </div >
  );
};

export default Survey;