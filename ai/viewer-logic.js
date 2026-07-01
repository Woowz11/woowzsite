/**
 * FileViewer Logic Module
 */

window.fileSystem = {
    groups: {
        image: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico'],
        video: ['mp4', 'webm', 'ogg'],
        audio: ['mp3', 'wav', 'aac', 'm4a'],
        models: ['obj', 'fbx'],
        render: ['md', 'html', 'xml'], 
        code: ['js', 'ts', 'py', 'java', 'cs', 'cpp', 'h', 'hpp', 'lua', 'sh', 'bat', 'css', 'json', 'yaml', 'php', 'sql'],
        text: ['txt', 'log', 'ini', 'conf'],
        archive: ['zip', 'rar', '7z', 'tar', 'gz'],
        binary: ['bin', 'exe', 'dll', 'so', 'o']
    },
    colors: {
        js: '#f7df1e', ts: '#3178c6', py: '#3776ab', html: '#e34f26', css: '#1572b6',
        json: '#888', png: '#4caf50', jpg: '#ff9800', svg: '#ffb13b', webp: '#2196f3',
        zip: '#fbc02d', pdf: '#f44336', java: '#b07219', cs: '#390091', lua: '#000080',
        video: '#ff0055', audio: '#00ffcc', models: '#3b82f6',
        folder: '#818cf8', default: '#94a3b8', md: '#08c', xml: '#ff6600', sql: '#336791'
    },
    langMap: { 
        'js': 'javascript', 'py': 'python', 'html': 'markup', 'xml': 'markup', 
        'svg': 'markup', 'java': 'java', 'cs': 'csharp', 'lua': 'lua', 
        'sh': 'bash', 'bat': 'batch', 'h': 'cpp', 'hpp': 'cpp' 
    },
    getGroup: function(ext) { 
        for (const [id, list] of Object.entries(this.groups)) { if (list.includes(ext)) return id; } 
        return null; 
    },
    getCapabilities: function(ext, isText) {
        const group = this.getGroup(ext);
        return {
            visual: (group === 'image' || group === 'video' || group === 'audio' || group === 'models' || group === 'render' || (group === 'code' && isText)),
            text: (isText && !['jpg', 'png', 'gif', 'webp', 'jpeg'].includes(ext)),
            hex: true, group: group
        };
    }
};

window.formatBytes = function(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

window.fileIcons = {
    library: {
        'js': '<path d="M3 3h18v18H3z"/><path d="M15 15h2v-2h2v5h-4zM10 13h2v2h2v3h-4z"/>',
        'ts': '<path d="M3 3h18v18H3z"/><path d="M12 11h3v2h-3v5h-2v-5h-3v-2z"/>',
        'py': '<path d="M12 2a5 5 0 0 1 5 5v2h-3V7a2 2 0 1 0-4 0v2H7V7a5 5 0 0 1 5-5z"/><path d="M12 22a5 5 0 0 1-5-5v-2h3v2a2 2 0 1 0 4 0v-2h3v2a5 5 0 0 1-5 5z"/>',
        'html': '<path d="M20 4l-2 14.5-6 1.5-6-1.5L4 4h16z"/><path d="M15.5 8H8.5l.5 3h6l-.5 3.5-2.5.5-2.5-.5-.1-1"/>',
        'css': '<path d="M20 4l-2 14.5-6 1.5-6-1.5L4 4h16z"/><path d="M8.5 8h7l-1 7-2.5.5-2.5-.5-.5-3.5h5"/>',
        'json': '<path d="M12 2L4 5v14l8 3 8-3V5l-8-3z"/><path d="M10 9l-2 3 2 3M14 9l2 3-2 3"/>',
        'md': '<path d="M22 5v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 15V9l3 3 3-3v6M17 11l2 2-2 2M19 9v6"/>',
        'png': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
        'jpg': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M21 15l-5-5L5 21"/><rect x="14" y="5" width="4" height="4" rx="1"/>',
        'svg': '<path d="M4 7l8-4 8 4v10l-8 4-8-4V7z"/><path d="M9 12l2 2 4-4"/>',
        'zip': '<path d="M10 2v4h4V2h-4zM10 6v4h4V6h-4zM10 10v4h4v-4h-4z"/><path d="M18 2h-3v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>',
        'pdf': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h2"/><path d="M9 12h5"/><path d="M9 18h3"/>',
        'java': '<path d="M17 12a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4z"/><path d="M7 19c2 2 6 2 8 0M10 21c2 2 6 2 8 0"/>',
        'cs': '<path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/><path d="M8 10a3 3 0 1 0 0 4M13 12h6M16 9v6"/>',
        'lua': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/>',
        'exe': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M8 12h1M11 12h1M8 15h1M11 15h1M14 12h1M14 15h1M11 18h1"/>',
        'bin': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><text x="7" y="14" font-family="monospace" font-size="3" fill="currentColor" font-weight="bold">0101</text><text x="7" y="18" font-family="monospace" font-size="3" fill="currentColor" font-weight="bold">1010</text>',
        'folder': '<path d="M2 20h20V6H12l-2-2H2v16z"/>',
        'unknown': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><text x="11" y="17" font-family="serif" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">?</text>',
        'txt': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
        'video': '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
        'audio': '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
        'models': '<path d="M12 2l10 5v10l-10 5-10-5V7l10-5z"/><path d="M12 22V12M22 7l-10 5M2 7l10 5"/><path d="M17 4.5l-5 2.5-5-2.5"/>'
    },
    getIconByFilename: function(name) {
        const clean = name.toLowerCase();
        if (clean === 'folder') return this.buildSVG('folder');
        if (clean === 'unknown') return this.buildSVG('unknown');
        const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : clean;
        return this.buildSVG(ext);
    },
    getAllIcons: function() {
        const icons = {};
        const allKeys = [...new Set([...Object.keys(this.library), ...Object.values(window.fileSystem.groups).flat()])];
        allKeys.forEach(key => { icons[key] = this.getIconByFilename(key); });
        return icons;
    },
    buildSVG: function(ext) {
        const color = window.fileSystem.colors[ext] || window.fileSystem.colors[window.fileSystem.getGroup(ext)] || window.fileSystem.colors.default;
        const body = this.library[ext] || this.library[window.fileSystem.getGroup(ext)] || this.library['unknown'];
        return { svg: `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="user-select: none; pointer-events: none;">${body}</svg>`, color };
    }
};

window.fileAnalyzer = {
    signatures: [{ type:'png', hex:[0x89, 0x50, 0x4E, 0x47] }, { type:'jpg', hex:[0xFF, 0xD8, 0xFF] }, { type:'gif', hex:[0x47, 0x49, 0x46, 0x38] }, { type:'webp', hex:[0x52, 0x49, 0x46, 0x46], checkWebP: true }, { type:'pdf', hex:[0x25, 0x50, 0x44, 0x46] }, { type:'zip', hex:[0x50, 0x4B, 0x03, 0x04] }, { type:'exe', hex:[0x4D, 0x5A] }, { type:'svg', contains:'<svg' }],
    analyze: function(fileName, buffer) {
        const uint8 = new Uint8Array(buffer), extFromPath = fileName.split('?')[0].split('.').pop().toLowerCase();
        let detected = null;
        for (const sig of this.signatures) {
            if (sig.hex && sig.hex.every((byte, i) => uint8[i] === byte)) { if (sig.checkWebP) { if (uint8[8] === 0x57 && uint8[9] === 0x45 && uint8[10] === 0x42 && uint8[11] === 0x50) detected = 'webp'; } else detected = sig.type; }
            if (sig.contains && !detected) { try { if (new TextDecoder().decode(uint8.slice(0, 2000)).includes(sig.contains)) detected = sig.type; } catch(e){} }
            if (detected) break;
        }
        let isPureText = true; const checkLen = Math.min(uint8.length, 12000);
        for (let i = 0; i < checkLen; i++) { const b = uint8[i]; if (b === 0 || (b < 32 && b !== 9 && b !== 10 && b !== 13)) { isPureText = false; break; } }
        let textContent = null; if (isPureText) { try { textContent = new TextDecoder('utf-8', { fatal: true }).decode(buffer); } catch(e) { isPureText = false; } }
        return { ext: detected || extFromPath, isText: isPureText, textContent: textContent };
    }
};
