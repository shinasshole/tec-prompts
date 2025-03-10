// 프롬프트 데이터
const prompts = {
    youtube: '',
    blog: ''
};

// 프롬프트 파일 로드
async function loadPrompts() {
    try {
        const [youtubeResponse, blogResponse] = await Promise.all([
            fetch('프롬프트_01.md'),
            fetch('프롬프트_02.md')
        ]);

        if (!youtubeResponse.ok || !blogResponse.ok) {
            throw new Error('프롬프트 파일을 불러오는데 실패했습니다.');
        }

        prompts.youtube = await youtubeResponse.text();
        prompts.blog = await blogResponse.text();

        // 버튼 이벤트 리스너 추가
        setupButtons();
    } catch (error) {
        console.error('Error loading prompts:', error);
        alert('프롬프트를 불러오는데 실패했습니다. 페이지를 새로고침해주세요.');
    }
}

// 버튼 설정
function setupButtons() {
    // 다운로드 버튼
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', () => {
            const promptType = button.dataset.prompt;
            downloadPrompt(promptType);
        });
    });
}

// 프롬프트 다운로드
function downloadPrompt(promptType) {
    const promptText = prompts[promptType];
    const fileName = promptType === 'youtube' ? 'tec_youtube_prompt.md' : 'tec_blog_prompt.md';
    
    const blob = new Blob([promptText], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// 페이지 로드 시 프롬프트 로드
document.addEventListener('DOMContentLoaded', loadPrompts); 