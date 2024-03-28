$(document).ready(function() {
  /* 심리/성격검사 */
    //테스트 결과를 txt 파일로 저장
    function downloadTxtFile() {
      // 텍스트 파일 내용
      const text = "저장할 텍스트 내용입니다.";
  
      // Blob 객체 생성
      const blob = new Blob([text], { type: "text/plain" });
  
      // 다운로드 링크 생성
      const a = $("<a>")
        .attr("href", URL.createObjectURL(blob))
        .attr("download", "file.txt")
        .text("파일 다운로드");
  

        Swal.fire({
          title: "추후에 추가될 예정입니다.",
          text: "다른 테스트를 이용해보세요!",
          icon: "error",
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
            window.location.href = "./MentalTest.html";
          }
        });
      // 링크를 화면에 추가
      // var resultElement = $("#result");
      // resultElement.append(a);
    }
  
    // 다운로드 버튼 클릭 이벤트 핸들러
    $("#downloadBtn").click(function() {
      downloadTxtFile();
    });
    
});