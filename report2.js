window.onload = Main;
const baseURL = "http://localhost:3000/workers";

function Main() {
  workersApp = new Vue({
    el: "#workersApp",
    data: {
      keyword: "",
      information: {
        show: 1
      },
      search: {
        show: 1
      },
      inputSearch: "", //検索バーの入力テキスト
      inputName: "", //名前
      inputGender: "", //性別
      inputAge: "", //年齢
      inputPosition: "", //雇用形態
      inputNumber: "", //電話番号
      inputEmergencyNumber: "", //緊急連絡先
      inputPostalcode: "", //郵便番号
      inputAddress: "", //住所
      inputBankName: "", //銀行名
      inputBranchName: "", //支店名
      inputBankAccount: "", //口座種別
      inputBankNumber: "", //口座番号
      inputAdditional: "", //特記事項
      workers: []
    },
    created: function() {
      getInfo();
    },
    methods: {
      sendInfo: function(event) {
        let url = baseURL;
        postInfo();
      },
      changeDispInfo: function(event) {
        workersApp.information.show++;
        console.log("一覧リストページ");
      },
      changeDispRegister: function(event) {
        workersApp.information.show--;
        console.log("登録ページ");
      },
      changeSearchPage: function(event) {
        workersApp.search.show++;
        console.log("検索ページ");
      },
      backPage: function(event) {
        workersApp.search.show--;
        console.log("元のページ");
      }
    },
    computed: {
      filterWorkers: function() {
        let workers = [];
        for (let i in this.workers) {
          let worker = this.workers[i];
          if (worker.name.indexOf(this.keyword) !== -1 ||
            worker.number.indexOf(this.keyword) !== -1) {
            workers.push(worker);
          }
        }
        return workers;
      }
    }
  });
}

function getInfo(event) {
  console.log("呼び出しチェック");
  let url = baseURL;
  fetch(url, {
    method: 'GET'
  }).then(function(response) {
    return response.json();
  }).then(function(res) {
    if (Array.isArray(res)) {
      workersApp.workers = res;
    } else {
      workersApp.workers = [res];
    }
  })
}

function postInfo(event) {
  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': workersApp.inputName,
      'gender': workersApp.inputGender,
      'age': workersApp.inputAge,
      'position': workersApp.inputPosition,
      'address': workersApp.inputAddress,
      'number': workersApp.inputNumber,
      'emergencynumber': workersApp.inputEmergencyNumber,
      'bankname': workersApp.inputBankName,
      'branchname': workersApp.inputBranchName,
      'bankaccount': workersApp.inputBankAccount,
      'banknumber': workersApp.inputBankNumber,
      'additional': workersApp.inputAdditional
    })
  }).then(function(res) {
    getInfo();
    workersApp.inputName = "";
    workersApp.inputGender = "";
    workersApp.inputAge = "";
    workersApp.inputPosition = "";
    workersApp.inputPostalcode = "";
    workersApp.inputAddress = "";
    workersApp.inputNumber = "";
    workersApp.inputEmergencyNumber = "";
    workersApp.inputBankName = "";
    workersApp.inputBranchName = "";
    workersApp.inputBankAccount = "";
    workersApp.inputBankNumber = "";
    workersApp.inputAdditional = "";
  });
}
