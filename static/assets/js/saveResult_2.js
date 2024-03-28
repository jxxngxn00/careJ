$(document).ready(function() {
  /* 우울증 검사 */
    //테스트 결과를 txt 파일로 저장
    function downloadTxtFile() {
      // 텍스트 파일 내용 (회원정보+테스트결과 계산 후 저장)
      var result = "";
      result = calculateResult();
      const text = "회원정보,"+result;
  
      // Blob 객체 생성
      const blob = new Blob([text], { type: "text/plain" });
  
      // 다운로드 링크 생성
      const a = $("<a>")
        .attr("href", URL.createObjectURL(blob))
        .attr("download", "file.txt")
        .text("파일 다운로드");

      // 링크를 화면에 추가
      var resultElement = $("#result");
      resultElement.append(a);
    }
  
    // 다운로드 버튼 클릭 이벤트 핸들러
    $("#downloadBtn").click(function() {
      downloadTxtFile();
    });

    // 테스트 결과 계산 함수
    function calculateResult(){
      /* 
      class = "rb-tab-active" 인 태그의 data-value값 저장해서 더함
            ①-0 ②-1 ③-2 ④-3
      예외 : 4, 12, 16번 
            ①-3 ②-2 ③-1 ④-0
      */

      var sum=0;

      $(".rb-tab-active").each(function() {
        var value = $(this).attr("data-value");
        sum += parseInt(value)-1;
      });

      if (sum < 21) {
        console.log("정상적인 우울감, 누구나 가지고 있는 일반적인 정도입니다.");
        var des = "정상적인 우울감, 누구나 가지고 있는 일반적인 정도입니다.";
      } else if (sum >= 5 && sum < 10) {
        console.log("주의가 필요한 우울감, 우울증 극복방법들을 통해 나아질 수 있습니다.");
        var des = "주의가 필요한 우울감, 우울증 극복방법들을 통해 나아질 수 있습니다.";
      } else {
        console.log("심각한 우울증, 이런 경우라면 꼭 전문가의 도움을 받기를 바랍니다.");
        var des = "심각한 우울증, 이런 경우라면 꼭 전문가의 도움을 받기를 바랍니다.";
      }

      console.log(sum);



      Swal.fire({
        title: "결과가 저장되었습니다.",
        text: "결과는 마이페이지에서 확인해주세요!",
        icon: "success",
        buttons: {
          confirm: {
            text: "이전 페이지로 돌아가기",
            value: true,
            visible: true,
            className: "custom-confirm-button",
            closeModal: true
          }
        }
      }).then(function(result) {
        if (result) {
          // 확인 버튼을 눌렀을 때 실행할 동작
          window.location.href = `/mv_mental?result2=${sum}&des=${des}`;
        }
      });
    }
    
});