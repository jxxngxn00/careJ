$(document).ready(function() {
  /* 자존감 검사 */
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

      var sum=0;
      $(".rb-tab-active").each(function() {
        var value = $(this).attr("data-value");
        sum += parseInt(value)-1;
      });

      if (sum >= 30) {
        var des3 = "건강하고 바람직한 자존감을 가졌어요 !";
      } else if (sum >= 20 && sum < 30) {
        var des3 = "보통 수준의 자존감이에요.";
      } else {
        var des3 = "자존감이 낮은 편에 속해요.";
      }

      console.log(sum);

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
          window.location.href = `/mv_mental?result3=${sum}&des3=${des3}`;
        }
      });
    }
    
});