import React, { useState,useEffect } from 'react';
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

const Timeline = styled.div`
  border: 3px solid  rgb(113, 184, 224);
  color:black;
  border-radius: 7px;
  margin-bottom: 3%;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: white;
`;

const Bt = styled.div`
  float: right;
  `;

const Message = () => {

  //axios.defaults.headers.common = { Accept: 'application/x-www-form-urlencoded, text/plain, \*/*' };
    const [open, setOpen] = useState(false);
    const [timelineSelect,setTimelineSelect]=useState([]);
    const [programtype,setProgramtype]=useState([]);
    const [addDetailModal,setAddDetailModal]=useState(false);
    const [dayState,setDayState]=useState([]);
    const [paramdata,setParamdata]=useState('0');

    //페이징 숫자 저장하는 state
    const [number,setNumber]=useState(0);
    //페이징 숫자 저장하는 배열
    const [numberArr,setNumberArr]=useState([]);

    const [questionId,setQuestionId]=useState("");

    const [list,setList]=useState([]);
    const [listtype,setListtype]=useState([]);
    const [detailState,setDetailState]=useState([]);
    let filePath = '/v2/program/' + sessionStorage.getItem('id') + '/';
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownwOpen, setDropdownwOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('0');
    const [wactiveTab,setWactiveTab]=useState('0');
    const [check,setCheck]=useState(false);
    const [details,setDetails]=useState([]);
    const [arr, setArr] = useState([0,]);
    const [detailId,setDetailId]=useState("");
    const [programtypeNum,setProgramtypeNum]=useState(0);
    const [surveyQuestion,setSurveyQuestion]=useState([]);
    const [filternum,setFilternum]=useState(-1);
    const [flag,setFlag]=useState(false);
    const [timelinetmp,setTimlinetmp]=useState({});
    const [dMmodal,setDMmodal]=useState(false);
    
    //페이징 할 때 첫 숫자
    const [currentStart,setCurrentStart]=useState(1);
    //페이징 할 때 끝 숫자
    const [currentEnd,setCurrentEnd]=useState(7);

    const [st,setSt]=useState(true);

    //
    const [state, setState] = useState([]);
    const [imodal, setImodal] = useState(false); //타임라인 추가 modal
    const [dmodal, setDmodal] = useState(false); //타임라인 삭제 modal
    const [emodal, setEmodal] = useState(false); //타임라인 수정 modal
    const [dDmodal, setDDmodal] = useState(false); //디테일 삭제 modal
    const [isQopen, setIsQopen] = useState(false);
    const [iwmodal,setIwmodal] = useState(false);
    const [idgmodal,setIdgmodal] = useState(false);

    const [weekState,setWeekState]=useState([]);
    const [dayGroupState,setDayGroupState]=useState([]);

    const [selectWeek,setSelectWeek]=useState([]);
    const [selectDayGroup,setSelectDayGroup]=useState([]);
    
    const [paramWeek,setParamWeek]=useState("0");
    const [paramDay,setParamDay]=useState("");

    const [dayTitle,setDayTitle]=useState("");
    const [weekTitle,setWeekTitle]=useState("");

    const [weekmodal,setWeekmodal]=useState(false);
    const [daymodal,setDaymodal]=useState(false);

    const [dayNum,setDayNum]=useState(-1);

   const callquestiontoggle = () => {
     
    setIsQopen(!isQopen)
  
  };

    const [image, setImage] = useState({
      txt: '',
      type: '0',
      fileName: '',
      imagePath: '',
      imageData: '',
    });
    const toggleDrop = () => setDropdownOpen(prevState => !prevState);
    const togglewDrop = () => setDropdownwOpen(prevState => !prevState);

   
    //주 클릭 토글
    const weekToggle = () =>{
      setWeekmodal(!weekmodal);
      setState({
        ...state
      })
      
    }

    const dayToggle =() =>{
      setDaymodal(!daymodal);
      setState({
        ...state
      })
    }

    const addWeekToggle = () => {
      setIwmodal(!iwmodal);
    }
//주 추가
    const addWeek=async(e)=>{
      let weekData = {
        "TITLE":weekState.wTITLE,
        "WEEK":Number(weekState.wWEEK),
        "PROGRAM_TYPE":Number(weekState.wPROGRAM_TYPE),
      }
  
      await axios.post('api', JSON.stringify(weekData)).then((res) => { 
        
        console.log(res);
        getTimelineSelect();
        //details[details.length] = detailData;
        if(paramWeek!==0){
          selectWeek[selectWeek.length-1]=weekData;
        }
        xModal(); 
      
      });
    }

    const addDayGroupToggle = () =>{
      setIdgmodal(!idgmodal);
    }

    //데이그룹 추가
    const addDaygroup=async(e)=>{
      if(dayNum===0){
        alert("전체를 선택하셨을 경우에 그룹 추가가 불가능합니다.")
      }
      else if(dayNum===-1){
        alert("Day를 선택하지 않았습니다.")

      }
      else{
        let weekData = {
          "TITLE":dayGroupState.dTITLE,
          "DAYS":Number(dayGroupState.dDAY),
          "PROGRAM_TYPE":Number(dayGroupState.dPROGRAM_TYPE),
        }
    
        await axios.post('api', JSON.stringify(weekData)).then((res) => { 
          
          console.log(res);
          getTimelineSelect();
          if(dayNum!==-1){
            selectDayGroup[selectDayGroup.length-1]=weekData;
          }
          
          xModal(); 
        
        });

      }
     
    }

    //주차 수정
    const modifyWeek =async(e)=>{
      let modData = {
        "TITLE":weekState.wTITLE,
        "WEEK":Number(paramWeek),
        "PROGRAM_TYPE":programtypeNum,
      }
  
      await axios.post('api', JSON.stringify(modData)).then((res) => { 
        getTimelineSelect();
        if(paramWeek!==0){
          setWeekTitle(weekState.wTITLE)
          selectWeek.map((data,i)=>{
            if(data.WEEK===Number(paramWeek)){
              selectWeek[i].TITLE=weekState.wTITLE;
            }
          })
        }
        xModal(); 
      
      });
    }

    //day 그룹 수정
    const modifyDay =async(e)=>{
      let modData = {
        "TITLE":dayGroupState.dTITLE,
        "DAYS":Number(dayNum),
        "PROGRAM_TYPE":programtypeNum,
      }
  
      await axios.post('api', JSON.stringify(modData)).then((res) => { 
        
        console.log(res);
        //details[details.length] = detailData;
        getTimelineSelect();
        if(dayNum!==-1){
          selectDayGroup.map((data,i)=>{
            if(data.DAYS===Number(dayNum)){
              selectDayGroup[i].TITLE=dayGroupState.dTITLE;
            }
          })
        }
        xModal(); 
      
      });

    }

    const tapToggle = async (tab) => {
        if (activeTab !== tab) await setActiveTab(tab);
    };

  let isOpen = () => {
    setOpen(!open);
   
  };

  const toggleDetail = (type,id,e) =>{

    setAddDetailModal(!addDetailModal);
    setList([]);
    setListtype([]);
    setQuestionId("");
    setProgramtypeNum(type);
    setDetailId(id);
    setDetailState({
      "type1": 1,
    })
    setArr([0,]);

   
  }


  //저장되어있는 프로그램 타입 가져오는 함수 ex) 고혈압, 금연
  let getProgramType = async () => {
      
    await axios.post('api')
    .then((response)=>{
        setProgramtype(response.data.ProgramType);
    
    })
    
  }

// 프로그램 타입이 바뀔 때마다 paramdata와 prgramtypenum을 해당 타입아이디로 set해준다.
// pramdata가 바뀔때마다 765 line의 useEffect가 실행된다.
  let getTimeline = async(id) => {
    setParamdata(id);
    setProgramtypeNum(id);
    setNumberArr([])
    setWeekTitle("")
    setDayTitle("");
    setCheck(true);
  }

  let getWeek =(weeknum,weektitle) => {
    setParamWeek(weeknum);
    setWeekTitle(weektitle)
  }
/*
  useEffect(()=>{
    if(paramWeek!=="0"){

    }

  },[paramWeek])
*/

   //타임라인 큰 정보 가져오는 함수
   let getTimelineSelect = async () => {
    let parameter;
    parameter={PROGRAM_TYPE:paramdata}
    setDetails([]);

    await axios.post('api',JSON.stringify(parameter))
    .then((response)=>{
      let data =response.data.data;
        setTimelineSelect(response.data.data);
        setSelectWeek(response.data.week);
        setSelectDayGroup(response.data.days);

        let num=data.length;
        let number2 = 0;
        if(data[num-1]!==undefined){
          number2=data[num-1].DAYS
        }
        setTimeout(()=>{
          setNumber(number2);
          setCurrentStart(1);
          setSt(true);
        },0)
    })
    
  }
  useEffect(()=>{
    if (paramdata !== '0') {
      let arr =[];
        for(let i=((Number(paramWeek)*7)-6);i<(Number(paramWeek)*7+1);i++){
         
          arr.push(i)
        }
        setTimeout(()=>{
          setNumberArr(arr);
        },0)
        setFilternum(-1);
    }
    
  },[paramWeek])

  /* 각 디테일에서 질문 불러오기를 누르면
    Survey 피드에 있는 해당 설문지의 질문들을 불러온다.
    그대 원하는 질문을 클릭하면 QuestionID가 list에 set된다.
   */
  let getQid = (id,e,num) => {
    setQuestionId(id);

    //question"+`${i}`
    setList({
      ...list,
      ["question"+num]:id
    })
  }

  //detail 추가 함수
  let onDetailSubmit = async(e)=>{

    let tmpObj={};
    let tmpArr=[];
    // TEXT_FIELD_LIST 는 객체들로 모여있는 리스트형태이다.
    //따라서 입력된 listype 길이만큼 for문을 돌려 listtype에따라 list의 값을 tmpObj에 넣고 tmpArr에 push 해준다.
    //listtype만큼 for문이 다 돌았으면 여러개의 객체들이 tmpArr에 담겨져 있다.
    //tmpArr를 TEXT_FEILD_LIST에 string으로 바꿔 넣어준다.
    for(let i=0;i<Object.keys(listtype).length;i++){
        tmpObj={
          "TYPE":"",
          "TITLE":"",
          "TXT":"",
          "IMG":"",
          "VIDEO":"",
          "QUESTION_ID":"",
        };
          if(Number(listtype['list_type'+i])===1){
            tmpObj.TYPE=1;
            tmpObj.TITLE=list['title'+i];
            tmpArr.push(tmpObj);
          }
          else if(Number(listtype['list_type'+i])===2){
            tmpObj.TYPE=2;
            tmpObj.TXT=list['txt'+i];
            tmpArr.push(tmpObj);

          }
          else if(Number(listtype['list_type'+i])===3){
            tmpObj.TYPE=3;
            tmpObj.IMG=list['img'+i];
            tmpArr.push(tmpObj);

          }
          else if(Number(listtype['list_type'+i])===4){
            tmpObj.TYPE=4;
            tmpObj.VIDEO=list['video'+i];
            tmpArr.push(tmpObj);

          }
          else if(Number(listtype['list_type'+i])===5){
            tmpObj.TYPE=5;
            tmpObj.QUESTION_ID= list['question'+i];
            tmpArr.push(tmpObj);

          }
      
    }
    let arr=[];

    for(let i=0;i<details.length;i++){
      if(detailId===details[i].TIMELINE_MASTER_ID){
        arr.push(details[i])
      }
    }
    let detailData = {
      "TIMELINE_DETAIL_ID":getUuid(),
      "TIMELINE_MASTER_ID":detailId,
      "TIMELINE_DETAIL_SEQ":arr.length+1,
      "TEXT_FIELD_LIST":JSON.stringify(tmpArr),
      "DELETED":0,
      "CREATOR":sessionStorage.getItem('id'),
    }

    await axios.post('/management/apis/timeline/detail/insert', JSON.stringify(detailData)).then((res) => { 
      
      console.log(res);
      details[details.length] = detailData;
      xModal(); 
    
    });
  
  }

  // detail 수정 함수
  let onEditDetail = async(e) => {
    let tmpObj={};
    let tmpArr=[];

    // detail 추가 함수와 같은 형식이다.
    
    for(let i=0;i<Object.keys(listtype).length;i++){
        tmpObj={
          "TYPE":"",
          "TITLE":"",
          "TXT":"",
          "IMG":"",
          "VIDEO":"",
          "QUESTION_ID":"",
        };
          if(Number(listtype['list_type'+i])===1){
            tmpObj.TYPE=1;
            tmpObj.TITLE=list['title'+i];
            tmpArr.push(tmpObj);
          }
          else if(Number(listtype['list_type'+i])===2){
            tmpObj.TYPE=2;
            tmpObj.TXT=list['txt'+i];
            tmpArr.push(tmpObj);
          }
          else if(Number(listtype['list_type'+i])===3){
            tmpObj.TYPE=3;
            tmpObj.IMG=list['img'+i];
            tmpArr.push(tmpObj);
          }
          else if(Number(listtype['list_type'+i])===4){
            tmpObj.TYPE=4;
            tmpObj.VIDEO=list['video'+i];
            tmpArr.push(tmpObj);
          }
          else if(Number(listtype['list_type'+i])===5){
            tmpObj.TYPE=5;
            tmpObj.QUESTION_ID= list['question'+i];
            tmpArr.push(tmpObj);
          }
      
    }
    let arr=[];
    for(let i=0;i<details.length;i++){
      if(detailId===details[i].TIMELINE_MASTER_ID){
        arr.push(details[i])
      }
    }
    let detailData = {
      "TIMELINE_DETAIL_ID":state.TIMELINE_DETAIL_ID,
      "TIMELINE_MASTER_ID":state.TIMELINE_MASTER_ID,
      "TIMELINE_DETAIL_SEQ":arr.length+1,
      "TEXT_FIELD_LIST":JSON.stringify(tmpArr),
      "DELETED":0,
      "CREATOR":sessionStorage.getItem('id'),
    }
    await axios.post('/management/apis/timeline/detail/insert', JSON.stringify(detailData)).then((res) => { 
      console.log(res);
      for(let i=0;i<details.length;i++){
        if(i.TIMELINE_DETAIL_ID===state.TIMELINE_DETAIL_ID){
          details[i]=detailData;
        }
      }
      getDetail(timelinetmp,e);
      xModal(); 
    
    });

    
   }




   // 타임라인의 ID와 각 디테일의 MASTER_ID와 같은 것들을 배열로 만들어 details에 set시켜준다.
  let getDetail = async(data,e)=>{
    setTimlinetmp(data);
    setProgramtypeNum(data.PROGRAM_TYPE)

    await axios.post('api',JSON.stringify({"TIMELINE_MASTER_ID":data.TIMELINE_ID}))
    .then((response)=>{
      setDetails([]);
      let det=response.data.detail;
      setDetails(det);

      let arr=[];
      for(let i=0;i<det.length;i++){
        if(data.TIMELINE_ID===det[i].TIMELINE_MASTER_ID){
          arr.push(det[i])
        }
        
      }
     // setDeatilseq(arr.length);
      setDetails(arr)
    })
    getQuestion(e);

  }

  // 전체를 누르면 전체 타임라인을 볼 수 있게 daystate에 timelineSelect를 set시켜주었고
  // 숫자를 누르면 타임라인 중 해당 숫자와 같은 DAYS들을 daystate에 배열로 만들어 set시켜주었다.
  // 렌더링 할때 전체나 숫자를 누르면 daystate를 map돌려 보여주었다.
  let getDaystate = (num)=>{
    setDayTitle("");
    setFilternum(num);
    //전체
    setDetails([]);
    setCheck(true);
    if(num===0){
      setDayState([]);
      setDayNum(num);
      setTimeout(()=>{
        setDayState(timelineSelect);
      },0)

    }
    //숫자
    else if(num!==0){
      setDayState([]);
      setDayNum(num);

      selectDayGroup.map((data1,j)=>{
        if(data1.DAYS===num){
          setDayTitle(data1.TITLE)
        }
      })
      
      let tmp=[];
      timelineSelect.map((data,i)=>{
        if(data.DAYS===num){
          tmp.push(data);
          
        }
      })

      setTimeout(()=>{
        setDayState(tmp);
      },0)
     
    }
  }

//왼쪽 화살표 누르기
let leftpaging = () => {
  let arr = [];
  if (currentStart !== 1) {
    for (let i = currentStart; i < currentStart + 7; i++) {
      arr.push(i - 7);
    }
    setSt(true);

  setCurrentStart(arr[0]);
  setCurrentEnd(arr[arr.length-1]);

  setTimeout(() => {
    setNumberArr(arr);

  }, 0)
}
}


  //오른쪽 화살표 누르기
  let rightpaging = () => {
    let arr = [];
    if (st === true) {
      if (currentStart + 13 < number) {
        for (let i = currentStart; i < currentStart + 7; i++) {
          arr.push(i + 7);
        }
      }
      else {
        for (let i = currentStart + 7; i < number + 1; i++) {
          arr.push(i);
          setSt(false);
        }
      }
      setCurrentStart(arr[0]);
      setTimeout(() => {
        setNumberArr(arr);
      }, 0)
    }


  }

  //질문 불러오기를 할때  programtypeNum에 따라 정해둔 surveyid를 parameter의 값으로 넣어준다.
  //그리고 해당 파라미터 객체를 질문을 불러오는 axios 쓸때 함께 넘겨준다.
  let getQuestion = async(e) =>{
    let parameter;
    if(programtypeNum===1){
      parameter={surveyid:"00000000000000000000000000000000"};
    }
    else if(programtypeNum===2){
      parameter={surveyid:"00000000000000000000000000000001"};
    }
    axios.post('api',JSON.stringify(parameter))
    .then((res)=>{setSurveyQuestion(res.data.question);})

  }


  /*질문 추가 + 버튼*/
  let onAddNumsubmit = async (e) => {
    let tmp = [];
    if(detailState.type1<=3){
      for (let i = 0; i < detailState.type1; i++) {
        tmp.push("");
      }
      setArr(tmp)
    }
    else{
      alert("리스트 수는 3개가 최대입니다.")
    }
   
  }

    /*질문 수정 + 버튼*/
    let onNumsubmit = async (e) => {
      let tmp = JSON.parse(state.TEXT_FIELD_LIST);
      if(Number(tmp.length)<3){
        tmp.push("");
  
        setState({ ...state, "TEXT_FIELD_LIST": JSON.stringify(tmp), "type1": Number(tmp.length) });
      }
      else{
        alert("LIST 수는 최대 3개까지 가능합니다.")
      }
      
    }

    /*질문 수정 - 버튼*/
    let onNumsubmit1 = async (e) => {
      let tmp = JSON.parse(state.TEXT_FIELD_LIST);
      tmp.splice(JSON.parse(state.TEXT_FIELD_LIST).length - 1, 1);
      setState({ ...state, "TEXT_FIELD_LIST": JSON.stringify(tmp), "type1": Number(tmp.length) });
      let arr=[];
      arr=list;

      let arrtype=[];
      arrtype=listtype;

      if(tmp.length<Object.keys(list).length){
        for(let i=0;i<Object.keys(list).length-tmp.length;i++){
          let t=Object.keys(arr).pop();
          let tt=Object.keys(arrtype).pop();
          delete arr[Object.keys(arr).pop()];
          delete arr.t;
          delete arrtype[Object.keys(arrtype).pop()];
          delete arr.tt;
        }
        
      }
      
      setList(arr);
      setListtype(arrtype);
    }

  let xModal = () => {
    setAddDetailModal(false);
    setImodal(false); //타임라인 추가 modal
    setDmodal(false); //타임라인 삭제 modal
    setEmodal(false); //타임라인 수정 modal
    setDDmodal(false); //디테일 삭제 modal
    setDMmodal(false);
    setIsQopen(false);
    setWeekmodal(false);
    setIwmodal(false);
    setIdgmodal(false);
    setDaymodal(false);
  }
  let getUuid = () => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = 'x' ? r : r && 0x3 | 0x8;
      return v.toString(16).toUpperCase();
    });
  };
  let getImage = (image,num) => {
    let reader = new FileReader();
    let file = image.target.files[0];

    let imagePaths = [];
    let imageDatas = [];
    
    if (file) {
      reader.onloadend = () => {
        let imagePath = filePath + getUuid() + '.jpg';
        //setList에 imagePath 저장 시키기
        setList({
          ...list,
          ["img"+num]:imagePath
        })
        let fileSize = 0;
        let browser = navigator.appName;

        // 익스플로러일 경우
        // if (browser == 'Microsoft Internet Explorer') {
        //   let oas = new ActiveXObject('Scripting.FileSystemObject');
        //   fileSize = oas.getFile(image.target.value).size;
        // }
        // 익스플로러가 아닐경우
        // else {
        fileSize = file.size;
        // }
        // let res = component.resizeingimg(reader.result);
        //
        let widths;
        let heights;

        let img = new Image();
        img.src = reader.result;

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        new Promise((resolve, reject) => {
          img.onload = (e) => {
            if (fileSize > 3 * 1024 * 1024) {
              widths = e.target.width / 2;
              heights = e.target.height / 2;
            } else {
              widths = e.target.width;
              heights = e.target.height;
            }
          };
          setTimeout(() => {
            resolve();
          }, 0);
        })
          .then(() => {
            canvas.width = widths;
            canvas.height = heights;
            ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, widths, heights);
          })
          .then(() => {
            let imageData;
            imagePaths.push(imagePath);
            if (fileSize > 3 * 1024 * 1024) {
              imageDatas.push(canvas.toDataURL('image/png'));
              imageData = canvas.toDataURL('image/png');
            } else {
              imageDatas.push(reader.result);
              imageData = reader.result;
            }

            setImage({
              ...image,
              imagePath: imagePaths[0],
              imageData: imageDatas[0],
            });
            {
              // let imagePath = component.state.imagePath;
              // let imageData = component.state.imageData;
              // 등록 완료 후 선택한 이미지가 있는 경우 업로드
              let name = imageDatas.length - 1;

              if (imageData != null && imageData.startsWith('data:image')) {
                let image;
                if (fileSize > 3 * 1024 * 1024) {
                  image = {
                    data: canvas.toDataURL('image/png').split(',')[1],
                    fileName: imagePath,
                  };
                } else {
                  image = {
                    data: reader.result.split(',')[1],
                    fileName: imagePath,
                  };
                }

                document.getElementById('img').src =
                  'link';

                uploadImage(image, name);
              }
            }
          })

          .catch((e) => {
            console.log(e);
          });

        //
      };
      reader.readAsDataURL(file);
    }
  };

  let uploadImage = (image, name) => {
    let component = this;
    let params = {
      file: image,
    };
//---
    axios
      .post('api', JSON.stringify(params))

      .then(function (result) {
        let url_string1 =
          'link' + filePath;
        console.log('성공');

        axios
          .get(image.fileName)
          .then(function (res) {
            // res.header('Access-Control-Allow-Origin', '*');

            document.getElementById('img').src =
              'link' +
              image.fileName;
            // axios.defaults.baseURL = sessionStorage.getItem('axiosURL');
          })

          .catch(function (e) {
            console.log(e);
          });
        console.log('Image Uploaded Succeeded');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(()=>{
    if (paramdata !== '0') {
      getTimelineSelect();
      
    }
    setFilternum(-1);
    setParamWeek("0")
    setWeekTitle("")
    setDayTitle("");
    setDayState([]);
  },[paramdata])

  useEffect(()=>{
    console.log("paramWeek",paramWeek)
  },[paramWeek])

  useEffect(()=>{
    console.log("dayTitle",dayTitle)
    //console.log("weekTitle",weekTitle)
    //setParamWeek(0)
    //setWeekTitle("")
    //setDayTitle("");
    //setDayState([]);
  },[dayTitle])
  

  //timelineSelect가 변경 될 때마다 getDaystate함수를 불러 웹 페이지를 실시간으로 업데이트 시켜준다.
  useEffect(()=>{
    if(filternum!==-1){
      getDaystate(filternum);
    }
  },[timelineSelect])

  

  let onChangeDetailhandler = (e) => {
    let { name, value } = e.target;

    setDetailState({
      ...detailState,
      [name]: value,
    });
   
  };

  let onChangeListhandler = (e) => {
    let { name, value } = e.target;
    
      setList({
        ...list,
        [name]: value,
      });
    
   
  };

  let onChangeListtypehandler = (e) => {
    let { name, value } = e.target;
    
      setListtype({
        ...listtype,
        [name]: value,
      });
   
  };


  let onChangehandler = (e) => {
    let { name, value } = e.target;
    if(name==="wPROGRAM_TYPE"||name==="wWEEK"||name==="wTITLE"){
      setWeekState({
        ...weekState,
        [name]:value,
      });
      console.log(e.target.value)
    }
    if(name==="dPROGRAM_TYPE"||name==="dDAY"||name==="dTITLE"){
      console.log(dayGroupState)
      setDayGroupState({
        ...dayGroupState,
        [name]:value,
        "dDAY":dayNum,
      })

    }
    if(name==="weeknum"){
      setDayTitle("");
      selectWeek.map((wdata,i)=>{
        if(wdata.WEEK===Number(e.target.value)){
          setWeekTitle(wdata.TITLE)

          setParamWeek(Number(e.target.value));
        }
      })
      

    }
    setState({
      ...state,
      [name]: value,
    });
   
  };
/*
  useEffect(()=>{
    selectWeek.map((wdata,i)=>{
      if(wdata.WEEK===paramWeek){
        setWeekTitle(wdata.TITLE)
        console.log(wdata.TITLE);
      }
    })
  },[paramWeek])*/

  useEffect(()=>{
    setDayState([]);
    console.log("paramweek",paramWeek)
  },[paramWeek])
  useEffect(()=>{
    console.log("dayState",dayState)
  },[dayState])
  useEffect(() => {
    if (open === true) {
        //getNumber();
        getProgramType();
        
    }
  }, [open]);

  

  let getTime = (time) => {
    let date = new Date(time * 1000 + 3600 * 9 * 1000).toISOString();
    return date;
  }

    /*타임라인 추가 toggle*/
  const toggleInput = () => {
      setImodal(!imodal);
      setState({
          ...state,
          "TIMELINE_ID": getUuid()
      })
  }

  /*타임라인 추가 버튼*/
  let onSubmitTimeline = async (e) => {
    if(dayNum===0||dayNum===-1){
      alert("Day 선택 안함")
    }
    else if(dayTitle===""){
      alert("DAY 그룹이 존재하지 않습니다.")
    }
    else{
      let data = {
        "TIMELINE_ID": state.TIMELINE_ID,
        "TITLE": state.TITLE,
        "TEXT": state.TEXT,
        "DAYS": Number(dayNum),
        "TIME": state.TIME,
        "ACTION": Number(state.ACTION),
        "PROGRAM_ID": "00000000000000000000000000000000",
        "PROGRAM_TYPE": Number(state.PROGRAM_TYPE),
        "CREATOR": sessionStorage.getItem('id'),
        "CREATE_TIME": parseInt(new Date().getTime() / 1000),
        "DELETED": 0
    }
    await axios.post('api', JSON.stringify(data))
        .then((res) => {
            console.log(res);
            getTimelineSelect();
            xModal();
        });
    }
    
        
}

    /*타임라인 삭제 toggle*/
let toggledeleteTimeline = (data, e) => {
  setDmodal(!dmodal);
  setState({
      "TIMELINE_ID": data.TIMELINE_ID,
      "TITLE": data.TITLE,
      "TEXT": data.TEXT,
      "DAYS": data.DAYS,
      "TIME": data.TIME,
      "ACTION": data.ACTION,
      "PROGRAM_ID": data.PROGRAM_ID,
      "PROGRAM_TYPE": data.PROGRAM_TYPE,
      "CREATOR": data.CREATOR,
      "CREATE_TIME": data.CREATE_TIME,
      "DELETED": 1
  })
}

  /*타임라인 삭제 버튼*/
  let deleteTimeline = (data, e) => {
    let data1 = {
        "TIMELINE_ID": state.TIMELINE_ID,
        "TITLE": state.TITLE,
        "TEXT": state.TEXT,
        "DAYS": state.DAYS,
        "TIME": state.TIME,
        "ACTION": state.ACTION,
        "PROGRAM_ID": state.PROGRAM_ID,
        "PROGRAM_TYPE": state.PROGRAM_TYPE,
        "CREATOR": state.CREATOR,
        "CREATE_TIME": state.CREATE_TIME,
        "DELETED": 1
    }
    axios.post('api', JSON.stringify(data1))
        .then((res) => {
            setFlag(!flag);
            
            setTimeout(()=>{
              getTimelineSelect();
              setSt(true);
              setCurrentStart(1);
            },0)
            xModal();
        })
}

 /*타임라인 수정 toggle*/
 let toggleeditTimeline = (data, e) => {
  setEmodal(!emodal);

  setState({
      "TIMELINE_ID": data.TIMELINE_ID,
      "TITLE": data.TITLE,
      "TEXT": data.TEXT,
      "DAYS": data.DAYS,
      "TIME": data.TIME,
      "ACTION": data.ACTION,
      "PROGRAM_ID": data.PROGRAM_ID,
      "PROGRAM_TYPE": data.PROGRAM_TYPE,
      "CREATOR": data.CREATOR,
      "CREATE_TIME": data.CREATE_TIME,
      "DELETED": 0
  })
}


/*타임라인 수정 버튼*/
let onEditTimeline = async (e) => {
  console.log("state",state);
  console.log("details",details)
  
  //타임라인 디테일을 여부를 X로 만들때
  // 해당 타임라인에 존재하는 모든 디테일도 삭제함
  if(Number(state.ACTION)===0){
    details.map((det,i)=>{
      let ddata = {
        "TIMELINE_DETAIL_ID": det.TIMELINE_DETAIL_ID,
        "TIMELINE_MASTER_ID": det.TIMELINE_MASTER_ID,
        "TIMELINE_DETAIL_SEQ": det.TIMELINE_DETAIL_SEQ,
        "TEXT_FIELD_LIST": det.TEXT_FIELD_LIST,
        "CREATOR": det.CREATOR,
        "CREATOR_TIME": det.CREATOR_TIME,
        "DELETED": 1
      }
      axios.post('api', JSON.stringify(ddata))
      .then((res) => {
          console.log(res);
          getDetail(timelinetmp,e);
          xModal();
      })
    })

  }


  let data = {
      "TIMELINE_ID": state.TIMELINE_ID,
      "TITLE": state.TITLE,
      "TEXT": state.TEXT,
      "DAYS": Number(state.DAYS),
      "TIME": state.TIME,
      "ACTION": Number(state.ACTION),
      "PROGRAM_ID": state.PROGRAM_ID,
      "PROGRAM_TYPE": Number(state.PROGRAM_TYPE),
      "CREATOR": state.CREATOR,
      "CREATE_TIME": state.CREATE_TIME,
      "DELETED": 0
  }

  await axios.post('api', JSON.stringify(data))
      .then((res) => {
          console.log(res)
          getTimelineSelect();
          xModal();
      });
  
}


/* 디테일 수정 toggle*/

let togglemodifyDetail = (data,e) => {
  setDMmodal(!dMmodal);
  let listtypearr =[];


  setListtype([]);
  setList([]);
  
  for(let i=0;i<JSON.parse(data.TEXT_FIELD_LIST).length;i++){
    listtypearr['list_type'+i]=JSON.parse(data.TEXT_FIELD_LIST)[i].TYPE;
  }
  listtypearr.shift();

  let listarr=[];

  for(let i=0;i<JSON.parse(data.TEXT_FIELD_LIST).length;i++){
    if(JSON.parse(data.TEXT_FIELD_LIST)[i].TYPE===1){
      //TITLE
      
      listarr['title'+i]=JSON.parse(data.TEXT_FIELD_LIST)[i].TITLE;
    }
    else if(JSON.parse(data.TEXT_FIELD_LIST)[i].TYPE===2){
      //TXT
      listarr['txt'+i]=JSON.parse(data.TEXT_FIELD_LIST)[i].TXT;
    }
    else if(JSON.parse(data.TEXT_FIELD_LIST)[i].TYPE===3){
      //IMG
      listarr['img'+i]=JSON.parse(data.TEXT_FIELD_LIST)[i].IMG;
    }
    else if(JSON.parse(data.TEXT_FIELD_LIST)[i].TYPE===4){
      //VIDEO
      listarr['video'+i]=JSON.parse(data.TEXT_FIELD_LIST)[i].VIDEO;
    }
    else if(JSON.parse(data.TEXT_FIELD_LIST)[i].TYPE===5){
      //QUESTION_ID
      listarr['question'+i]=JSON.parse(data.TEXT_FIELD_LIST)[i].QUESTION_ID;
    }
  }

  setListtype(listtypearr);
  setList(listarr);
  
  
   setState({
      "TIMELINE_DETAIL_ID": data.TIMELINE_DETAIL_ID,
      "TIMELINE_MASTER_ID": data.TIMELINE_MASTER_ID,
      "TIMELINE_DETAIL_SEQ": data.TIMELINE_DETAIL_SEQ,
      "TEXT_FIELD_LIST": data.TEXT_FIELD_LIST,
      "CREATOR": data.CREATOR,
      "CREATOR_TIME": data.CREATOR_TIME,
      "DELETED": data.DELETED
    })
}

/* 디테일 삭제 toggle*/
let toggledeleteDetail = (data, e) => {
  setDDmodal(!dDmodal);
  setState({
      "TIMELINE_DETAIL_ID": data.TIMELINE_DETAIL_ID,
      "TIMELINE_MASTER_ID": data.TIMELINE_MASTER_ID,
      "TIMELINE_DETAIL_SEQ": data.TIMELINE_DETAIL_SEQ,
      "TEXT_FIELD_LIST": data.TEXT_FIELD_LIST,
      "CREATOR": data.CREATOR,
      "CREATOR_TIME": data.CREATOR_TIME,
      "DELETED": 1

  })
}

/* 디테일 삭제 버튼*/
let deleteDetail = async (e) => {
  let data = {
      "TIMELINE_DETAIL_ID": state.TIMELINE_DETAIL_ID,
      "TIMELINE_MASTER_ID": state.TIMELINE_MASTER_ID,
      "TIMELINE_DETAIL_SEQ": state.TIMELINE_DETAIL_SEQ,
      "TEXT_FIELD_LIST": state.TEXT_FIELD_LIST,
      "CREATOR": state.CREATOR,
      "CREATOR_TIME": state.CREATOR_TIME,
      "DELETED": 1
  }

  axios.post('api', JSON.stringify(data))
      .then((res) => {
          console.log(res);
          getDetail(timelinetmp,e);
          xModal();
      })
}
  return (
    <Card>
      <CardHeader>
        <FlexBox>
          TimeLine{' '}
          <RightButton>
            <Button onClick={(e) => isOpen()}>OPEN</Button>
          </RightButton>
        </FlexBox>
      </CardHeader>
      <Collapse isOpen={open}>
        <CardBody style={ {height: "15%"}}>
          <Hei1000 style={ {height: "1000px"}}>
            <Row >
              <Col lg="12">
              <Nav tabs>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
                    <DropdownToggle className="programlist" caret>
                        프로그램 종류
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>프로그램 종류</DropdownItem>
                        <div style={{ height: '220px', overflow: 'auto' }} >
                          {programtype.map((data, i) => {
                            return (
                              <DropdownItem key={i} className={classnames({
                                active: activeTab === (i + 1).toString(),
                              })}
                                onClick={(e) => {
                                  tapToggle((i + 1).toString());
                                  getTimeline(data.program_type);
                                }}>
                                {programtype[i].program_explan}
                              </DropdownItem>
                            );
                          })}
                        </div>
                    </DropdownMenu>
                </Dropdown>
                <div className="addMessage"><Button color="primary" onClick={toggleInput} >타임라인 추가</Button></div> 
                {/*타임라인 추가 modal*/}
                {imodal === true ?
                  <Modal isOpen={imodal}>
                    <ModalHeader style={{fontFamily:"Jua",fontSize:"30px",paddingLeft:"35%"}}>타임라인 메세지 추가</ModalHeader>
                    <ModalBody>
                      <Box>
                        <p className="attr">제목</p>
                        <Input type="text" name="TITLE" onChange={(e) => onChangehandler(e)}></Input>
                      </Box>
                      <Box>
                        <p className="attr">타임라인 문구</p>
                        <Input type="text" name="TEXT" onChange={(e) => onChangehandler(e)}></Input>
                      </Box>
                      <Box>
                        <p className="attr">Day</p>
                        <Input type="text" name="DAYS" value={dayNum} disabled onChange={(e) => onChangehandler(e)}></Input>
                      </Box>
                      <Box>
                        <p className="attr">시간 설정</p>
                        <Input type="time" name="TIME" onChange={(e) => onChangehandler(e)}></Input>
                      </Box>
                      <Box>
                        <p className="attr">프로그램 타입</p>
                        <Input type="select" name="PROGRAM_TYPE" onChange={(e) => onChangehandler(e)}>
                          <option>선택해주세요.</option>
                          <option value='1'>고혈압</option>
                          <option value='2'>금연</option>
                        </Input>
                      </Box>
                      <Box>
                        <p className="attr">Detail 여부</p>
                        <Input type="select" name="ACTION" onChange={(e) => onChangehandler(e)}>
                          <option>선택해주세요.</option>
                          <option value='0'>X</option>
                          <option value='1'>O</option>
                        </Input>
                      </Box>
                      <Button type="submit" color="secondary" className="tsubmit" onClick={(e) => xModal(e)}>취소</Button>
                      <Button type="submit" color="primary" className="tsubmit" onClick={(e) => onSubmitTimeline(e)}>추가</Button>
                                    
                                        
                    </ModalBody>
                  </Modal> : <Modal isOpen={false}></Modal>}

                                {/*타임라인 수정 modal*/}
                {emodal === true ? <Modal isOpen={emodal}>
                  <ModalHeader >타임라인 수정</ModalHeader>
                  <ModalBody>
                    <Box>
                      <p className="attr">제목</p>
                      <Input type="text" name="TITLE" onChange={(e) => onChangehandler(e)} value={state.TITLE} />
                    </Box>
                    <Box>
                      <p className="attr">타임라인 문구</p>
                      <Input type="text" name="TEXT" onChange={(e) => onChangehandler(e)} value={state.TEXT} />
                    </Box>
                    <Box>
                      <p className="attr">Day</p>
                      <Input type="text" name="DAYS" onChange={(e) => onChangehandler(e)} value={state.DAYS} />
                    </Box>
                    <Box>
                      <p className="attr">시간 설정</p>
                      <Input type="time" name="TIME" onChange={(e) => onChangehandler(e)} value={state.TIME} />
                    </Box>
                    <Box>
                      <p className="attr">Detail 여부</p>
                      <Input type="select" name="ACTION" onChange={(e) => onChangehandler(e)} value={state.ACTION}>
                        <option>선택해주세요.</option>
                        <option value="0">X</option>
                        <option value="1">O</option>
                      </Input>
                    </Box>
                    <Button type="submit" color="secondary" className="tsubmit" onClick={(e) => xModal(e)}>취소</Button>
                    <Button type="submit" color="primary" className="tsubmit" onClick={(e) => onEditTimeline(e)}>수정</Button>
                  </ModalBody>
                </Modal> : <Modal isOpen={false}></Modal>}

                {dmodal === true ? 
                <Modal isOpen={dmodal}>
                  <ModalHeader ><span className="dmodalheader">타임라인 삭제</span></ModalHeader>
                  <ModalBody>
                    <p className="dmodalbody">해당 타임라인을 정말 삭제하시겠습니까?</p>
                    <div className="deletesurveyBtn">
                      <Button style={{marginRight:"2px",fontFamily:"Jua"}} color="primary" onClick={(e) => deleteTimeline(e)}>삭제</Button>
                      <Button style={{fontFamily:"Jua"}} color="secondary" onClick={(e) => xModal()} >취소</Button>
                    </div>
                  </ModalBody>
                </Modal> : <Modal isOpen={false}></Modal>}

                {dDmodal === true ? 
                <Modal isOpen={dDmodal}>
                  <ModalHeader ><span className="dmodalheader">디테일 삭제</span></ModalHeader>
                  <ModalBody>
                    <p className="dmodalbody">해당 디테일을 정말 삭제하시겠습니까?</p>
                    <div className="deletesurveyBtn">
                      <Button color="primary" onClick={(e) => deleteDetail(e)}>삭제</Button>
                      <Button color="secondary" onClick={(e) => xModal()} >취소</Button>
                    </div>
                  </ModalBody>
                </Modal> : <Modal isOpen={false}></Modal>}

                                                    {dMmodal === true ? <Modal isOpen={dMmodal}>
                                                        <ModalHeader ><span className="t1">디테일 수정</span></ModalHeader>
                                                        <ModalBody >
                                                       
                                                          <div className="listh"> <span className="t">LIST</span>
                                                          <Button className="minus" type="submit" color="dark" onClick={(e) => onNumsubmit1(e)}>-</Button>
                                                          <Button className="plus" type="submit" outline color="dark" onClick={(e) => onNumsubmit(e)}>+</Button>     
                                                          </div>
                                                          <div>{JSON.parse(state.TEXT_FIELD_LIST).map((data, i) => {
                                                            return(
                                                            <div key={i}>
                                                              <Box>
                                                                <div className="listbadge"><Badge >{i+1}</Badge></div>
                                                              <div className="optionhead">
                                                              <Input type="select" name={"list_type" + `${i}`} onChange={(e) => onChangeListtypehandler(e)} defaultValue={data.TYPE}>
                                                              
                                                              <option>선택해주세요. </option>
                                                              <option value='1'>TITLE</option>
                                                              <option value='2'>TXT</option>
                                                              <option value='3'>IMG</option>
                                                              <option value='4'>VIDEO</option>
                                                              <option value='5'>QUESTION</option>
                                                              </Input>
                                                              </div>
                                                              {
                                                              (data.TYPE === "1" || data.TYPE=== 1 || data.TYPE === '2' || data.TYPE === 2 ||data.TYPE=== '4' || data.TYPE === 4 ||data.TYPE === '5' || data.TYPE  === 5)
                                                              && (listtype['list_type' + i] === 3 ||listtype['list_type' + i] === '3')?
                                                              <InputGroup>
                                                              <Input type="file" name={"img" + `${i}`} onChange={(e) => getImage(e, i)}></Input>
                                                              <img id="img" src={"link"} width="200" height="200" ></img></InputGroup>:
                                                              
                                                              listtype['list_type' + i] === "1" || listtype['list_type' + i] === 1 || (data.TYPE === 1 && listtype['list_type' + i] === undefined)?

                                                              <Input key={i} type="text" name={"title" + `${i}`} onChange={(e) => onChangeListhandler(e)} defaultValue={data.TITLE}>
                                                              </Input> :
                                                              listtype['list_type' + i] === '2' || listtype['list_type' + i] === 2 || (data.TYPE === 2 && listtype['list_type' + i] === undefined)?
                                                              <Input key={i} type="text" name={"txt" + `${i}`} onChange={(e) => onChangeListhandler(e)} defaultValue={data.TXT}>
                                                              </Input>
                                                              : listtype['list_type' + i] === '3' || listtype['list_type' + i] === 3 || (data.TYPE === 3 && listtype['list_type' + i] === undefined)?
                                                              <InputGroup>
                                                              <Input type="file" name={"img" + `${i}`} onChange={(e) => getImage(e, i)}></Input>
                                                              <div><img id="img" src={data.IMG===undefined?"link"+data.IMG} width="200" height="200" ></img></div>
                                                              </InputGroup>
                                                              
                                                              : listtype['list_type' + i] === '4' || listtype['list_type' + i] === 4 || (data.TYPE === 4 && listtype['list_type' + i] === undefined)?
                                                              <div>
                                                              <h5>youtube</h5>
                                                              <Input type="text" name={"video" + `${i}`} onChange={(e) => onChangeListhandler(e)}></Input>
                                                              </div>
                                                              :
                                                              ((listtype['list_type' + i] === '5' || listtype['list_type' + i] === 5) && (programtypeNum === 1 || programtypeNum === '1')) ||( data.TYPE ===5 && listtype['list_type' + i] === undefined)?
                                                              <div>
                                                                
                                                                {surveyQuestion.map((qdata1, k1) => {
                                                                  
                                                                  return(
                                                                    qdata1.question_id===data.QUESTION_ID?<div key={k1}>
                                                                      <Box color="dark">
                                                                      <div className="qqhead"  >
                                                                    <div className="qq">질문 유형</div>
                                                                    <div>{qdata1.question_type === 1 ? "객관식" : qdata1.question_type === 2 ? "주관식" : qdata1.question_type === 3 ? "O/X" : qdata1.question_type === 4 ? "단답식" : ""}</div>

                                                                    <div className="qq">질문 제목</div>
                                                                    <div>{qdata1.question_txt}</div>
                                                                    {qdata1.question_type === 1 || qdata1.question_type === 4 ?
                                                                    <div className="qq">답안지</div> : ""}

                                                                    <div>{JSON.parse(qdata1.question_choice).map((qdata3, j) => { return (<span key={j}><Badge color="dark">{j + 1}</Badge>{qdata3}</span>) })}</div>
                                                                    </div>


                                                                    </Box>
                                                                    </div>:""
                                                                  )
                                                                })}

                                                                <Button className="callq" color="primary" onClick={callquestiontoggle} style={{ marginBottom: '1rem' }}>질문 불러오기</Button>

                                                                <Collapse isOpen={isQopen}>
                                                                  <Card>
                                                                      <CardBody>
                                                                      {surveyQuestion.map((qdata,k)=>{
                                                                 return(
                                                                    <div className="getquestion" key={k}>
                                                                    <button className="callquestionbtn" onClick={(e)=>getQid(qdata.question_id,e,i)} >
                                                                      <div className="qq">질문 유형</div>
                                                                     <div>{qdata.question_type===1?"객관식":qdata.question_type===2?"주관식":qdata.question_type===3?"O/X":qdata.                                                               question_type===4?"단답식":""}</div>

                                                                      <div className="qq">질문 제목</div>
                                                                      <div>{qdata.question_txt}</div>
                                                                      {qdata.question_type===1||qdata.question_type===4?
                                                                      <div className="qq">답안지</div>:""}
      
                                                                      <div>{JSON.parse(qdata.question_choice).map((qdata2,j)=>{return(<span key={j}><Badge color="dark">{j+1}</Badge>{qdata2}</span>)}                                                                )}</div>
                                                                    </button>
                                                                    </div>
                                                                  )
                                                                })}
                                                                      </CardBody>
                                                                  </Card>
                                                                </Collapse>



                                                                    </div>
                                    : (listtype['list_type' + i] === '5' || listtype['list_type' + i] === 5) && (programtypeNum === 2 || programtypeNum === '2') ?
                                      <div>

                                      <Button className="callq" color="primary" onClick={callquestiontoggle} style={{ marginBottom: '1rem' }}>질문 불러오기</Button>
                                      <Collapse isOpen={isQopen}>
                                        <Card>
                                            <CardBody>
                                            {surveyQuestion.map((qdata,k)=>{
                                      return(
                                          <div className="getquestion" key={k}>
                                         <button className="callquestionbtn" onClick={(e)=>getQid(qdata.question_id,e,i)} >
                                            <div className="qq">질문 유형</div>
                                           <div>{qdata.question_type===1?"객관식":qdata.question_type===2?"주관식":qdata.question_type===3?"O/ X":qdata.question_type===4?"단답식":""}</div>

                                            <div className="qq">질문 제목</div>
                                            <div>{qdata.question_txt}</div>
                                            {qdata.question_type===1||qdata.question_type===4?
                                           <div className="qq">답안지</div>:""}

                                           <div>{JSON.parse(qdata.question_choice).map((qdata2,j)=>{return(<span key={j}><Badge color="dark">{j+1}</Badge>{qdata2}</span>)})}</div>
                                         </button>
                                         </div>
                                        )
                                      })}
                                           </CardBody>
                                        </Card>
                                      </Collapse>
                                      </div>
                                      : ""}  
                                                              </Box>
                                                              
                                                            </div>
                                                            
                                                            
                                                            )
                                                          })}</div>
                                                          
                                                         
                                                         <div className="wlsbtn">
                                                         <Button color="secondary" className="tsubmit" onClick={(e) => xModal()}>취소</Button>
                                                        <Button color="primary" className="tsubmit" onClick={(e) => onEditDetail(e)}>수정</Button>
                                                        </div></ModalBody>
                                                    </Modal> : <Modal isOpen={false}></Modal>}


                {/*programtype.map((data, i) => {
                  return (
                    <NavItem key={i}> 
                      <NavLink
                        className={classnames({
                          active: activeTab === (i + 1).toString(),
                        })}
                        onClick={(e) => {
                          tapToggle((i + 1).toString());
                          getTimeline(data.program_type);
                        }}
                      >
                      {programtype[i].program_explan}
                      </NavLink>
                    </NavItem>
                  );
                })*/}
             </Nav>
             {programtype.map((data, i) => {
                  return (
                    <TabContent activeTab={activeTab} key={i}>
                      <TabPane tabId={(i + 1).toString()}>

                        <Row>
                        <span style={{marginLeft:"38%"}} className="timelinehead">{i+1===programtype[i].program_type?programtype[i].program_explan:""}
                                에 관한 타임라인</span>
                        <InputGroup>
                                  <Input style={{marginTop:"1%"}} type="select" name="weeknum" onChange={(e) => onChangehandler(e)} value={paramWeek}>
                                    <option value={"0"}>선택해주세요.</option>
                                    {selectWeek.map((wdata1,i)=>{
                                      return(
                                        <option key={i} value={`${i+1}`}>{wdata1.WEEK}주차</option>
                                      )
                                    })}
                                  </Input>

                                  <Button style={{marginTop:"10px",marginLeft:"20px"}} className="addweek" onClick={(e)=>addWeekToggle()}>Week 추가</Button>
                                  
                                </InputGroup>
                                {paramWeek==='0'||paramWeek===0?"": <div style={{textAlign:"center",marginTop:"2%",marginBottom:"2%",width:"1050px"}}><button className="weektoggleBtn" onClick={(e)=>weekToggle(e)}><div className="weekName"style={{width:"1000px"}} >{paramWeek}주차 제목 : {weekTitle}</div></button></div>}
                          <Col lg="6">

                              
                                
                             
                                  {check===false?"":
                                  <div className="paging">
                                  <button style={{marginTop:"2%"}} onClick={(e)=>getDaystate(0)} className="allpaging" >전체</button>
                                  {/*<button onClick={(e)=>leftpaging()} className="leftpaging">◁</button>*/}
                                  {paramWeek==='0'||paramWeek===0?"":numberArr.map((data,i)=>{
                                  
                                    return(
                                    
                                      <button className="pagingnum" key={i} onClick={(e)=>getDaystate(data)}>{data}</button>
                                    
                                  )
                                  })}
                                  
                                  {/*<button onClick={(e)=>rightpaging()} className="rigthpaging">▷</button>*/}
                                  
                                  {filternum===0||filternum===-1?"":dayTitle===""?<div>
                                    <Button style={{marginTop:"20px",marginLeft:"20px"}} className="addweek" onClick={(e)=>addDayGroupToggle()}>Day그룹 만들기</Button>
                                  </div>:<div style={{textAlign:"center",marginTop:"2%",marginBottom:"2%"}}>
                                    <button className="daytoggleBtn" onClick={(e)=>dayToggle()}>
                                      <div className="dayName">{dayTitle}</div>
                                    </button>
                                  </div>}

                              <div>

                                
                              {dayState.map((data,i)=>{
                                

                                  return(
                                    <div className="timelinebox" key={i}>
                                      <button className="timelinebtn" key={i} onClick={(e)=>getDetail(data,e)}>
                                   
                                      <div className="time"><span>Time: </span>{data.TIME}</div>
                                      <div className="day"><span>DAYS: {data.DAYS}</span></div>
                                      <div className="ttext1" >{data.TITLE}</div><hr />
                                          <div className="ttext2">{data.TEXT}</div>

                                                
                                      </button>
                                        {data.ACTION===1?<button className="adbt" onClick={(e)=>toggleDetail(data.PROGRAM_TYPE,data.TIMELINE_ID,e)}><span className="dad">Detail 추가</span></button>:""}
                                        
                                       
                                        <Button style={{fontFamily:"Jua"}} className="delbt" onClick={(e) => toggledeleteTimeline(data, e)}>삭제</Button>
                                        <Button style={{fontFamily:"Jua"}} color="info" className="edbt" onClick={(e) => toggleeditTimeline(data, e)}>수정</Button>
                                        
                                      </div>
                                      
                                  )
                                })}
                  
                              </div></div>}
                                
                          </Col>
                          <Col lg="6">
                            <div className="rigthblock">
                                
                                


                              <div className="rightdetails">Details</div>
                            
                            
                              {details.length !== 0 ?
                                details.map((data1, i) => {
                                  return (<Timeline key={i}>
                                  <div key={i} className="buttonbox">
                                    <button className="detailmodifybt" onClick={(e) => togglemodifyDetail(data1, e)}>수정</button>
                                    <button className="detaildeletebt" onClick={(e) => toggledeleteDetail(data1, e)}>삭제</button></div>
                                    {/*<div>Creator : {data1.CREATOR}</div>*/}
                                    <div><div className="textlist">TEXT_FEILD_LIST</div>
                                {JSON.parse(data1.TEXT_FIELD_LIST).map((data, i) => {
                                        return (
                                          <div key={i}>
                                            
                                            {data.TYPE === 1 ? <div><div className="type">TITLE </div><p className="detailtxt">{data.TITLE}</p></div> : data.TYPE === 2 ? <div><div className="type">TXT </div><p className="detailtxt">{data.TXT}</p></div> : data.TYPE === 3 ? <div><div className="type">IMG </div><img className="detailimg"
                                              id="img1"
                                              src={"link" + data.IMG}
                                              width="200"
                                              height="200"
                                            ></img></div> : data.TYPE === 4 ? <div><div className="type">VIDEO </div><iframe src={"http://www.youtube.com/watch?v=" + data.VIDEO}
                                              width="200"
                                              height="200"></iframe></div> : data.TYPE === 5 ? <div><div className="type">QUESTION </div>{surveyQuestion.map((qdata, i) => {
                                                if (qdata.question_id === data.QUESTION_ID){ 
                                                  return <div key={i}><p className="detailquestion">{qdata.question_txt}</p><div>{qdata.question_type === 1? <div>{JSON.parse(qdata.question_choice).map((d, i) => (<Col key={i} className="questCol" xs="auto" ><div className="g1">{d}</div></Col>))}</div> : qdata.question_type === 2? <div className="ju1">주관식</div> : qdata.question_type === 3? <div><div className="o"><input type="radio" disabled></input> O</div><div className="x"><input type="radio" disabled></input> X</div></div> : qdata.question_type === 4? <div>{JSON.parse(qdata.question_choice).map((d, i) => (<Col key={i} className="questCol" xs="auto" ><div className="dan">{d}</div></Col>))}</div> : ""}</div></div>;
                                                }

                                              })}</div> : ""}
                                            <hr />

                                          </div>
                                        )
                                      })}

                                    </div>
                                  </Timeline>)
                                })
                                : <Timeline style={{height:"300px"}}><div className="nodata"><div>선택된 타임라인이 없거나</div><div>Detail이 존재하지 않습니다.</div></div></Timeline>}

                            </div>
                            

                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  );
                })}

              {weekmodal === true ? <Modal isOpen={weekmodal}>
                    <ModalHeader style={{fontFamily:"Jua",fontSize:"30px",textAlign:"center"}} >Week 수정</ModalHeader>
                      <ModalBody>
                      <Box>
                        <p className="attr" style={{fontFamily:"Jua",fontSize:"20px",textAlign:"center"}}>타이틀</p>
                        <Input type="text" name="wTITLE" defaultValue={weekTitle} onChange={(e) => onChangehandler(e)}></Input>
                      </Box>
                      
                      <Button type="submit" color="secondary" className="tsubmit" onClick={(e)=>xModal(e)}>취소</Button>
                      <Button type="submit" color="primary" className="tsubmit" onClick={(e)=>modifyWeek(e)}>수정</Button>

                    </ModalBody>
                  </Modal> : <Modal isOpen={false}></Modal>}

                  {daymodal === true ? <Modal isOpen={daymodal}>
                    <ModalHeader style={{fontFamily:"Jua",fontSize:"30px",paddingLeft:"38%"}} >Day Group 수정</ModalHeader>
                      <ModalBody>
                      <Box>
                        <p className="attr"  style={{fontFamily:"Jua",fontSize:"20px",textAlign:"center"}}>타이틀</p>
                        <Input type="text" name="dTITLE" defaultValue={dayTitle} onChange={(e) => onChangehandler(e)}></Input>
                      </Box>
                      
                      <Button type="submit" color="secondary" className="tsubmit" onClick={(e)=>xModal(e)}>취소</Button>
                      <Button type="submit" color="primary" className="tsubmit" onClick={(e)=>modifyDay(e)} >수정</Button>

                    </ModalBody>
                  </Modal> : <Modal isOpen={false}></Modal>}

                {iwmodal === true ? <Modal isOpen={iwmodal}>
                  <ModalHeader style={{fontFamily:"Jua",fontSize:"30px",paddingLeft:"41%"}} >Week 추가</ModalHeader>
                    <ModalBody>
                     <Box>
                      <p className="attr">프로그램 타입</p>
                      <Input type="select" name="wPROGRAM_TYPE" onChange={(e) => onChangehandler(e)}>
                        <option>선택해주세요.</option>
                        <option value='1'>고혈압</option>
                        <option value='2'>금연</option>
                      </Input>
                    </Box>
                    <Box>
                      <p className="attr">주차</p>
                      <Input type="text" name="wWEEK" onChange={(e) => onChangehandler(e)}></Input>
                    </Box>
                    <Box>
                      <p className="attr">타이틀</p>
                      <Input type="text" name="wTITLE" onChange={(e) => onChangehandler(e)}></Input>
                    </Box>
                    <Button type="submit" color="secondary" className="tsubmit" onClick={(e)=>xModal(e)}>취소</Button>
                    <Button type="submit" color="primary" className="tsubmit" onClick={(e)=>addWeek(e)}>추가</Button>

                  </ModalBody>
                </Modal> : <Modal isOpen={false}></Modal>}

                {idgmodal === true ? <Modal isOpen={idgmodal}>
                  <ModalHeader >Day 그룹 만들기</ModalHeader>
                    <ModalBody>
                     <Box>
                      <p className="attr">프로그램 타입</p>
                      <Input type="select" name="dPROGRAM_TYPE" onChange={(e) => onChangehandler(e)}>
                        <option>선택해주세요.</option>
                        <option value='1'>고혈압</option>
                        <option value='2'>금연</option>
                      </Input>
                    </Box>
                    <Box>
                      <p className="attr">Day</p>
                      <Input type="text" name="dDAY" value={dayNum} disabled onChange={(e) => onChangehandler(e)}></Input>
                    </Box>
                    <Box>
                      <p className="attr">타이틀</p>
                      <Input type="text" name="dTITLE" onChange={(e) => onChangehandler(e)}></Input>
                    </Box>
                    <Button type="submit" color="secondary" className="tsubmit" onClick={(e)=>xModal(e)}>취소</Button>
                    <Button type="submit" color="primary" className="tsubmit" onClick={(e)=>addDaygroup(e)}>추가</Button>

                  </ModalBody>
                </Modal> : <Modal isOpen={false}></Modal>}

                 {<Modal isOpen={addDetailModal}  >
                    <ModalHeader ><span className="insertquestionform">Detail 추가</span></ModalHeader>
                        <ModalBody>
                            <Box><p className="t">리스트 수</p>
                                <InputGroup>
                                  <Input type="text" name="type1" defaultValue={1} onChange={(e) => onChangeDetailhandler(e)} ></Input>
                                <Button type="submit" color="primary" onClick={(e) => onAddNumsubmit(e)}>+</Button>
                                </InputGroup>
                                {arr.map((data, i) => {
                                  return (
                                   <InputGroup key={i}>
                    
                                      <Input className="headtype" type="select" name={"list_type" + `${i}`}onChange={(e) => onChangeListtypehandler(e)}>
                                                <option>선택해주세요.</option>
                                                <option value='1'>TITLE</option>
                                                <option value='2'>TXT</option>
                                                <option value='3'>IMG</option>
                                                <option value='4'>VIDEO</option>
                                                <option value='5'>QUESTION</option>
                                      </Input>
                                      {listtype['list_type' + i] === "1"||listtype['list_type' + i] === 1 ?
                                      <InputGroup>
                                      <Input name="content" key={i} type="text" name={"title" + `${i}`} onChange={(e) => onChangeListhandler(e)} >
                                      </Input></InputGroup>:
                                      listtype['list_type' + i] === '2'||listtype['list_type' + i] === 2 ?
                                      <InputGroup>
                                      <Input name="content" key={i} type="text" name={"txt" + `${i}`} onChange={(e) => onChangeListhandler(e)} >
                                      </Input></InputGroup>
                                      :listtype['list_type' + i] ==='3'||listtype['list_type' + i] ===3 ?
                                      <InputGroup>
                                        <Input type="file" name={"img"+`${i}`} onChange={(e) => getImage(e,i)}></Input>
                                        
                                        <div>
                                          <img id="img" src="link" width="200" height="200" ></img>
                                          
                                          </div>
                                      </InputGroup>
                                      :listtype['list_type' + i] ==='4'||listtype['list_type' + i] ===4 ?
                                      
                                        
                                      <InputGroup>
                                      <div className="youtube">youtube</div> 
                                        <Input name="content" type="text" name={"video"+`${i}`} onChange={(e) => onChangeListhandler(e)}></Input>
                                      </InputGroup>
                                      :
                                        (listtype['list_type' + i] ==='5'||listtype['list_type' + i] ===5) &&(programtypeNum===1||programtypeNum==='1') ?
                                        <InputGroup>
                                          
                                          <Button className="callq" color="primary" onClick={callquestiontoggle} style={{ marginBottom: '1rem' }}>질문 불러오기</Button>

                                                                <Collapse isOpen={isQopen}>
                                                                  <Card>
                                                                      <CardBody>
                                                                      {surveyQuestion.map((qdata,k)=>{
                                                                 return(
                                                                    <div className="getquestion">
                                                                    <button className="callquestionbtn" onClick={(e)=>getQid(qdata.question_id,e,i)} >
                                                                      <div className="qq">질문 유형</div>
                                                                     <div>{qdata.question_type===1?"객관식":qdata.question_type===2?"주관식":qdata.question_type===3?"O/X":qdata.                                                               question_type===4?"단답식":""}</div>

                                                                      <div className="qq">질문 제목</div>
                                                                      <div>{qdata.question_txt}</div>
                                                                      {qdata.question_type===1||qdata.question_type===4?
                                                                      <div className="qq">답안지</div>:""}
      
                                                                      <div>{JSON.parse(qdata.question_choice).map((qdata2,j)=>{return(<span><Badge color="dark">{j+1}</Badge>{qdata2}</span>)}                                                                )}</div>
                                                                    </button>
                                                                    </div>
                                                                  )
                                                                })}
                                                                      </CardBody>
                                                                  </Card>
                                                                </Collapse>


                                          
                                                                </InputGroup>
                                              :(listtype['list_type' + i] ==='5'||listtype['list_type' + i] ===5) &&(programtypeNum===2||programtypeNum==='2') ?
                                               <InputGroup>
                                              <Button className="callq" color="primary" onClick={callquestiontoggle} style={{ marginBottom: '1rem' }}>질문 불러오기</Button>

                                              <Collapse isOpen={isQopen}>
                                                <Card>
                                                    <CardBody>
                                                    {surveyQuestion.map((qdata,k)=>{
                                              return(
                                                  <div className="getquestion">
                                                  <button className="callquestionbtn" onClick={(e)=>getQid(qdata.question_id,e,i)} >
                                                    <div className="qq">질문 유형</div>
                                                  <div>{qdata.question_type===1?"객관식":qdata.question_type===2?"주관식":qdata.question_type===3?"O/                                             X":qdata.                                                               question_type===4?"단답식":""}</div>

                                                   <div className="qq">질문 제목</div>
                                                   <div>{qdata.question_txt}</div>
                                                   {qdata.question_type===1||qdata.question_type===4?
                                                   <div className="qq">답안지</div>:""}

                                                   <div>{JSON.parse(qdata.question_choice).map((qdata2,j)=>{return(<span><Badge color="dark">{j+1}</Badge>{qdata2}</span>)                                            }                                                                )}</div>
                                                 </button>
                                                 </div>
                                               )
                                              })}
                                                   </CardBody>
                                               </Card>
                                              </Collapse>

                                          </InputGroup>
                                      :""}
                                  </InputGroup>
                                    )
                                })}
                            
                            <Button style={{fontFamily:"Jua"}} type="submit" className="submitBt" onClick={(e)=>xModal()} color="secondary">취소</Button>
                            <Button style={{fontFamily:"Jua"}} type="submit" className="submitBt" color="primary" onClick={(e)=>onDetailSubmit()} >추가</Button>
                            
                            </Box>
                            
                            </ModalBody>


                    </Modal>}

                
              </Col>
            </Row>
          </Hei1000>
        </CardBody>
      </Collapse>
    </Card>
  );
};

export default Message;