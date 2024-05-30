import { ProCard } from '@ant-design/pro-components';
import {Button, message, Modal} from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import {Col,  Pagination, Row, Table, Image } from 'antd';
import {history, useModel} from "@@/exports";
import {history_borrow} from "@/services/demo/historyController";
import {now} from "moment";
import Card from "@/components/Card";
export default (props:any) => {
    const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
    const {jsonArr}=props
    const num =300
    let parallel=window.innerWidth/num%1>=0.5?Math.trunc(window.innerWidth/num)+1:Math.trunc(window.innerWidth/num)
    const user_id=initialState.id
    if (parallel > 5) {
        parallel=5
    }
    const len = jsonArr.length  //len为数组的长度
    const n = parallel // 假设每行显示4个
    const Num = len % parallel === 0 ? len / parallel : Math.floor((len / parallel) + 1)  //得出多少份
    const res = [] //定义数组接受最终的数据
    for (let i = 0; i < Num; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）的数组。且原始数组不会被修改。
        const newArr = jsonArr.slice(i * n, i * n + n) //得到每份的数据
        res.push(newArr) //往res数组里加数据
    }
    return (
            <>{res.map((i, key) => {
                let length = i.length;
                // const cssStyle=length==n?{width:window.innerWidth/parallel*0.7,height:window.innerHeight*0.35}:{height:window.innerHeight*0.35}
                const cssStyle={width:"100%",height:window.innerHeight*0.25,paddingTop:"5%"}

                return <ProCard
                    key={key}
                    split={'vertical'}
                    gutter={[16, 16]}
                    // title={}
                    style={{ width: "100%",background:"RGB(245, 245, 245)"}}
                >
                    {
                        // @ts-ignore
                        i.map((json, key) => {
                            const text_size=30
                            if (json.introduce.length>text_size) {
                                json.introduce=json.introduce.substring(0,text_size-1)+"..."
                            }
                            // @ts-ignore
                            return <ProCard key={key}  style={cssStyle}  split={"vertical"} wrap={true}>
                                {/*<ProCard bordered={true} onClick={()=>{*/}
                                {/*    history.push("/Detail?id="+json.id)*/}
                                {/*}}>*/}
                                <Row style={{width:"100%",height:"60%"}}>
                                    <Col span={6}></Col>
                                    <Col span={12} >
                                        <div style={{width:"100%",height:"90%"}}>
                                            <Image
                                                width={"100%"}
                                                style={{display:"block"}}
                                                height={"122px"}
                                                preview={false}
                                                placeholder={true}
                                                src={json.icon==""||json.icon==undefined?"/static/default_picture.jpg":json.icon}/>
                                        </div>

                                    </Col>

                                    <Col span={6}></Col>
                                </Row>
                                <div >
                                    <h3 style={{textAlign:"center"}}>{json.title}</h3>
                                    <p style={{textAlign:"center"}}>{json.introduce}</p>
                                </div>


                            </ProCard>
                        })

                    }
                </ProCard>
            })}
        </>
    );
};
