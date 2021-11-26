function onSearch() {
    let searchValue = document.getElementById("search").value;
    location.href = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${searchValue}`
}