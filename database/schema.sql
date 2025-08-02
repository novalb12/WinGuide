-- Create the windows_apps table
CREATE TABLE IF NOT EXISTS windows_apps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    winget_id VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on category for better performance
CREATE INDEX IF NOT EXISTS idx_windows_apps_category ON windows_apps(category);

-- Create an index on winget_id for uniqueness checks
CREATE INDEX IF NOT EXISTS idx_windows_apps_winget_id ON windows_apps(winget_id);

-- Insert sample data (you can modify this with your actual data)
INSERT INTO windows_apps (name, winget_id, description, category) VALUES
    ('Android Studio', 'Google.AndroidStudio', 'Android development IDE', 'Development'),
    ('Everything', 'voidtools.Everything', 'File search tool', 'Development'),
    ('Git', 'Git.Git', 'Version control system', 'Development'),
    ('Notepad++', 'Notepad++.Notepad++', 'Text editor', 'Development'),
    ('VLC media player', 'VideoLAN.VLC', 'Media player', 'Development'),
    ('WinRAR', 'RARLab.WinRAR', 'File archiver', 'Development'),
    ('Zoom', 'Zoom.Zoom', 'Video conferencing', 'Development'),
    ('Logitech G Hub', 'Logitech.GHub', 'Logitech G Hub', 'Development'),
    ('WinDirStat', 'WinDirStat.WinDirStat', 'Disk space analyzer', 'Development'),
    ('Node.js', 'OpenJS.NodeJS', 'JavaScript runtime', 'Development'),
    ('Python', 'Python.Python.3.12', 'Python programming language', 'Development'),
    ('Google Chrome', 'Google.Chrome', 'Popular web browser', 'Browsers'),
    ('Adobe Acrobat Reader', 'Adobe.Acrobat.Reader.64-bit', 'PDF reader', 'Development'),
    ('Visual Studio Code', 'Microsoft.VisualStudioCode', 'Code editor', 'Development'),
    ('Putty', 'putty.putty', 'SSH client', 'Development'),
    ('Internet Download Manager', 'Tonec.InternetDownloadManager', 'Download manager', 'Development'),
    ('Razer Synapse', 'RazerInc.RazerInstaller.Synapse4', 'Razer device management', 'Development'),
    ('Steam', 'Valve.Steam', 'Gaming platform', 'Gaming'),
    ('Epic Games Launcher', 'EpicGames.EpicGamesLauncher', 'Epic Games store', 'Gaming'),
    ('PowerToys', 'Microsoft.PowerToys', 'Windows utilities', 'Utilities'),
    ('Reolink', 'Reolink.Reolink', 'Reolink', 'Utilities'),
    ('Discord', 'Discord.Discord', 'Voice and text chat', 'Productivity'),
    ('Postman', 'Postman.Postman', 'API testing tool', 'Development'),
    ('Telegram', 'Telegram.TelegramDesktop', 'Telegram desktop', 'Productivity'),
    ('Cursor', 'Anysphere.Cursor', 'Cursor', 'Productivity')
ON CONFLICT (winget_id) DO NOTHING; 