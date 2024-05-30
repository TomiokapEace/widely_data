import {Button, Col, Drawer, FloatButton, Image, InputNumber, message, Row} from "antd";
import {MinusOutlined, PlusOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {ProCard} from "@ant-design/pro-components";
import React from "react";
import {getShoppingCart} from "@/models/global";
import {OrderListSave} from "@/services/demo/OrderController";

export default class ShoppingCart extends React.Component{
    max:number=10
    min:number=1


    state:{shoppingArr:any[],n:boolean,open:boolean}= {
        shoppingArr:[],
        n:true,
        open:false
    }
    setValue(id:string,value:number){
        if (value > this.max || value < this.min) {
            message.error("超过最大数额")
            return
        }
        let arr = this.state.shoppingArr
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].shopping_id == id) {
                arr[i].count=value
                if (arr[i].count == 0) {
                    arr.splice(i,i+1)
                }
            }
        }

        window.sessionStorage.setItem("shoppingCart",JSON.stringify(arr));
        this.setState({shoppingArr:arr})

    }
    t=setInterval(()=>{
        if (this.state.n) {
            // @ts-ignore
            this.setState({shoppingArr:window.cart})
            // this.setState({n:false})
        }
    },1000)
    componentDidMount() {
        this.setState({shoppingArr:window.cart})
    }

    countPrice(){
        let arr = this.state.shoppingArr
        let count=0
        for (let i = 0; i < arr.length; i++) {
            count=count+arr[0].price*arr[0].count
        }
        return count
    }
    render() {
        return <>
            <FloatButton icon={<ShoppingCartOutlined  />} onClick={()=> {
                this.setState({open: !this.state.open})
                if (this.state.n) {
                    // @ts-ignore
                    this.setState({shoppingArr:window.cart})
                    // this.setState({n:false})
                }
            }

            } style={{width:70,height:70}}/>
            <Drawer title="购物车" rootStyle={{height:400}}  mask={false} placement="right" onClose={()=>this.setState({open:false})} open={this.state.open}
            footer={<Row>
                <Col span={8} ><Button disabled={getShoppingCart().length==0} onClick={()=>{
                    if (getShoppingCart()!=null)
                        window.sessionStorage.removeItem("shoppingCart");
                    this.setState({shoppingArr:[]})
                    window.cart=[]
                }}>重置购物车</Button></Col>
                <Col span={8} ><h2 style={{color:"red"}}>￥{this.countPrice()}</h2></Col>
                <Col span={8} >
                    <Button type="primary" style={{marginLeft:20}} disabled={getShoppingCart().length==0} danger onClick={()=>{
                        const waitTime = async (time: number = 100) => {

                            OrderListSave(getShoppingCart()).then(
                                (s)=>{
                                    if (s.code == 200) {
                                        message.success("提交成功")
                                        if (getShoppingCart()!=null)
                                            window.sessionStorage.removeItem("shoppingCart");
                                        this.setState({shoppingArr:[]})
                                        window.cart=[]
                                    }else {
                                        message.error("提交失败")
                                    }
                                },
                                (e)=>{
                                    message.error("与服务器连接失败")
                                }
                            )
                        };
                        waitTime(1000)
                    }}>提交账单
                    </Button>
                </Col>

            </Row>
            }>
                <ProCard gutter={[16,16]} split={"vertical"} wrap={true}>

                        {
                            this.state.shoppingArr.map((obj,key)=>{
                                 return <ProCard >
                                     <Row>
                                         <Col span={12}>
                                         <Image
                                            width={50}
                                            height={50}
                                            src={obj.url}
                                        />
                                         </Col>
                                         <Col span={12}>
                                        <Button onClick={(e)=>this.setValue(obj.shopping_id,obj.count+1)} icon={<PlusOutlined />}/>
                                        <InputNumber min={this.min} size={"small"} style={{width:40}} max={this.max} value={obj.count} bordered={false} />
                                        <Button onClick={(e)=>this.setValue(obj.shopping_id,obj.count-1)} icon={<MinusOutlined />}/>
                                         </Col>
                                     </Row>
                                 </ProCard>

                            })
                        }

                </ProCard>
            </Drawer>
        </>
    }
}
