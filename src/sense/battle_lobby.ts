class battle_lobby extends eui.Component implements  eui.UIComponent {

	private lab_joinRandRoom:eui.Label;
	private lab_createRoom:eui.Label;
	private lab_roomList:eui.Label;
	private lab_joinRoom:eui.Label;


	private btn_return:eui.Button;

	private img_header:eui.Image;
	private lab_userID:eui.Label;
	public constructor() {
		super();
		GameData.syncFrame = false;
	}
	private moveToChange(item:any){
		item.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e: egret.TouchEvent)=>{
			console.log("上来");
			item.scaleX = 0.8;
			item.scaleY = 0.8;
		},this);
		item.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,(e: egret.TouchEvent)=>{
			console.log("离开");
			item.scaleX = 1;
			item.scaleY = 1;
		},this);
	}

	private getChilds(partName:string,instance:any):void{
		switch(partName){
			case "lab_joinRandRoom":
				this.moveToChange(instance);
				this.lab_joinRandRoom = instance;
				this.lab_joinRandRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickRandomMatch, this);
				break;
			case "lab_createRoom":
			this.moveToChange(instance);
				this.lab_joinRandRoom = instance;
				this.lab_joinRandRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickCreateRoom, this);
				break;
			case "lab_roomList":
			this.moveToChange(instance);
				this.lab_joinRandRoom = instance;
				this.lab_joinRandRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickJoinRoomList, this);
				break;
			case "lab_joinRoom":
			this.moveToChange(instance);
				this.lab_joinRandRoom = instance;
				this.lab_joinRandRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickJoinRoomSpecial, this);
				break;
			case "btn_return":
				this.moveToChange(instance);
				this.btn_return = instance;
				this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicklogOutGame, this);
				break;
			case "img_header":
			 	console.log("img_header!");
				this.img_header = instance;
				this.img_header.source = GameData.gameUser.avatar;
				console.log("img_headerover");
				break;
			case "lab_userID":
				this.lab_userID = instance;
				this.lab_userID.text ="用户："+GameData.gameUser.id+"\n"+GameData.gameUser.name;
				break;
			default:
				break;
		}
	}

	protected partAdded(partName:string,instance:any):void
	{
		this.getChilds(partName, instance);
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	/**
     * 随机加入房间按钮回调
     */
    private onButtonClickRandomMatch(e: egret.TouchEvent) {
        GameData.matchType = GameData.randomMatch;
        GameData.syncFrame = false;
        GameSceneView._gameScene.tobatmatch(bat_match.JOINFLAG.RANDROOM);
	}

    /**
     * 获取房间列表
     */
    private onButtonClickJoinRoomList(e:egret.TouchEvent){
        GameData.matchType = GameData.specialMatch;
        GameData.syncFrame = false;
        GameSceneView._gameScene.showRoomList();
    }

    /**
     * 创建房间
     */
    private onButtonClickCreateRoom(e:egret.TouchEvent){
        GameSceneView._gameScene.createRoom();
    }

    /**
     * 输入房间号加入房间
     */
    private onButtonClickJoinRoomSpecial(e:egret.TouchEvent){
        GameSceneView._gameScene.joinRoomSpecial();
    }


    private onButtonClicklogOutGame(e:egret.TouchEvent){
        mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_LOGOUT_RSP, this.logoutResponse,this);
        mvs.MsEngine.getInstance.logOut();
    }
    //
    private logoutResponse(ev:egret.Event){
        mvs.MsResponse.getInstance.removeEventListener(mvs.MsEvent.EVENT_LOGOUT_RSP, this.logoutResponse,this);
        let status = ev.data.status;
        if( status !== 200){
            console.log("退出登录失败!");
            return;
        }
        GameSceneView._gameScene.tobattle_login();
    }
	
	
}