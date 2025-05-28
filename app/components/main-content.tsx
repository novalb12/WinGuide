"use client"

import { SidebarInset } from "@/components/ui/sidebar"
import { CommandBlock } from "./command-block"
import { AppGrid } from "./app-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, Info } from "lucide-react"
import { BatchFunction } from "./batch-function"

interface MainContentProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MainContent({ activeSection, setActiveSection }: MainContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection setActiveSection={setActiveSection} />
      case "git":
        return <GitSection />
      case "nodejs":
        return <NodeJSSection />
      case "python":
        return <PythonSection />
      case "docker":
        return <DockerSection />
      case "windows-apps":
        return <WindowsAppsSection />
      case "common-issues":
        return <CommonIssuesSection />
      case "performance":
        return <PerformanceSection />
      default:
        return <OverviewSection setActiveSection={setActiveSection} />
    }
  }

  return (
    <SidebarInset className="flex-1">
      <div className="h-full overflow-y-auto">
        <div className="p-8">{renderContent()}</div>
      </div>
    </SidebarInset>
  )
}

function OverviewSection({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  return (
    <div className="space-y-6 max-w-full">
      <div>
        <h1 className="text-4xl font-bold mb-4">Complete Development Setup Guide</h1>
        <p className="text-xl text-muted-foreground">
          Set up your Windows machine with WSL and essential development tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setActiveSection("git")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              WSL Environments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Complete Linux development environment on Windows with Ubuntu, Python, Node.js, Docker and more.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setActiveSection("windows-apps")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              Windows Apps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Essential Windows applications installed via winget for productivity, development, and entertainment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              Batch Installation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Copy entire command sets to install multiple applications at once, saving time and effort.
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This guide combines WSL setup for development with Windows application installation using winget. Follow the
          sections in order for the best experience.
        </AlertDescription>
      </Alert>
    </div>
  )
}

function GitSection() {
  const gitCommands = [
    "sudo apt install -y git",
    'git config --global user.name novalb12',
    'git config --global user.email novalb65@gmail.com',
    'ssh-keygen -t ed25519 -C "novalb65@gmail.com"',
  ]

  return (
    <div className="space-y-6 max-w-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Git Configuration</h1>
        <p className="text-muted-foreground">Set up Git for version control in WSL.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Git Setup Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {gitCommands.map((command, index) => (
            <CommandBlock key={index} command={command} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function NodeJSSection() {
  const nodeCommands = [
    "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
    "source ~/.bashrc",
    "nvm install --lts",
    "nvm use --lts",
    "npm install -g yarn pnpm",
  ]

  return (
    <div className="space-y-6 max-w-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Node.js & npm</h1>
        <p className="text-muted-foreground">Install Node.js using Node Version Manager (nvm).</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Node.js Installation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {nodeCommands.map((command, index) => (
            <CommandBlock key={index} command={command} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function PythonSection() {
  const pythonCommands = [
    "sudo apt install -y python3 python3-pip python3-venv python3-dev build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python3-openssl git",
    "curl https://pyenv.run | bash",
    "echo 'export PYENV_ROOT=\"$HOME/.pyenv\"' >> ~/.bashrc",
    "echo 'command -v pyenv >/dev/null || export PATH=\"$PYENV_ROOT/bin:$PATH\"' >> ~/.bashrc",
    "echo 'eval \"$(pyenv init -)\"' >> ~/.bashrc",
    "source ~/.bashrc",
    "pyenv install 3.12.0",
    "pyenv global 3.12.0",
    "curl -sSL https://install.python-poetry.org | python3 -",
    "echo 'export PATH=\"$HOME/.local/bin:$PATH\"' >> ~/.bashrc",
    "poetry config virtualenvs.in-project true",
  ]

  return (
    <div className="space-y-6 max-w-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Python Development</h1>
        <p className="text-muted-foreground">Complete Python setup with pyenv and Poetry.</p>
      </div>
      <BatchFunction title="Python + pyenv + Poetry Setup" commands={pythonCommands} />
      <Card>
        <CardHeader>
          <CardTitle>Python + pyenv + Poetry Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pythonCommands.map((command, index) => (
            <CommandBlock key={index} command={command} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function DockerSection() {
  const dockerCommands = [
    "for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done",
    `# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \\
  $(. /etc/os-release && echo "\${UBUNTU_CODENAME:-\$VERSION_CODENAME}") stable" | \\
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update`,
    "sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin",
  ]

  return (
    <div className="space-y-6 max-w-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Docker Installation</h1>
        <p className="text-muted-foreground">Install Docker for containerization in WSL.</p>
      </div>

      <BatchFunction title="Docker Setup Commands" commands={dockerCommands} />
      <Card>
        <CardHeader>
          <CardTitle>Docker Setup Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dockerCommands.map((command, index) => (
            <CommandBlock key={index} command={command} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function WindowsAppsSection() {
  const allWindowsApps = [
    // Development Tools
    {
      name: "Android Studio",
      id: "Google.AndroidStudio",
      description: "Android development IDE",
      category: "Development",
    },
    {
      name: "Everything",
      id: "voidtools.Everything",
      description: "File search tool",
      category: "Development",
    },
    {
      name: "Git",
      id: "Git.Git",
      description: "Version control system",
      category: "Development",
    },
    {
      name: "Notepad++",
      id: "Notepad++.Notepad++",
      description: "Text editor",
      category: "Development",
    },
    { 
      name: "VLC media player",
      id: "VideoLAN.VLC",
      description: "Media player",
      category: "Development",
    },
    { 
      name: "WinRAR", 
      id: "RARLab.WinRAR", 
      description: "File archiver", 
      category: "Development" 
    },
    { 
      name: "Zoom", 
      id: "Zoom.Zoom", 
      description: "Video conferencing", 
      category: "Development" 
    },
    {
      name: "Logitech G Hub",
      id: "Logitech.GHub",
      description: "Logitech G Hub",
      category: "Development",
    },
    {
      name: "WinDirStat",
      id: "WinDirStat.WinDirStat",
      description: "Disk space analyzer",
      category: "Development",
    },
    { 
      name: "Node.js",
      id: "OpenJS.NodeJS",
      description: "JavaScript runtime",
      category: "Development"
    },
    {
      name: "Python",
      id: "Python.Python.3.12",
      description: "Python programming language",
      category: "Development",
    },
    {
      name: "Google Chrome",
      id: "Google.Chrome",
      description: "Popular web browser",
      category: "Browsers",
    },
    {
      name: "Adobe Acrobat Reader",
      id: "Adobe.Acrobat.Reader.64-bit",
      description: "PDF reader",
      category: "Development",
    },
    {
      name: "Visual Studio Code",
      id: "Microsoft.VisualStudioCode",
      description: "Code editor",
      category: "Development",
    },
    {
      name: "Putty",
      id: "putty.putty",
      description: "SSH client",
      category: "Development",
    },
    {
      name: "Internet Download Manager",
      id: "Tonec.InternetDownloadManager",
      description: "Download manager",
      category: "Development",
    },
    {
      name: "Razer Synapse",
      id: "RazerInc.RazerInstaller.Synapse4",
      description: "Razer device management",
      category: "Development",
    },
    {
      name: "Steam",
      id: "Valve.Steam",
      description: "Gaming platform",
      category: "Gaming",
    },
    {
      name: "Epic Games Launcher",
      id: "EpicGames.EpicGamesLauncher",
      description: "Epic Games store",
      category: "Gaming",
    },
    {
      name: "PowerToys",
      id: "Microsoft.PowerToys",
      description: "Windows utilities",
      category: "Utilities",
    },
    {
      name: "Reolink",
      id: "Reolink.Reolink",
      description: "Reolin",
      category: "Utilities",
    },
    {
      name: "Discord",
      id: "Discord.Discord",
      description: "Voice and text chat",
      category: "Productivity",
    },
    {
      name: "Postman",
      id: "Postman.Postman",
      description: "API testing tool",
      category: "Development",
    },
    {
      name: "Telegram",
      id: "Telegram.TelegramDesktop",
      description: "Telegram desktop",
      category: "Productivity",
    },
    {
      name: "Cursor",
      id: "Anysphere.Cursor",
      description: "Cursor",
      category: "Productivity",
    },
    {
      name: "Notepad++",
      id: "Notepad++.Notepad++",
      description: "Text editor",
      category: "Productivity",
    },
  ]

  return (
    <div className="h-full max-w-full">
      <AppGrid title="All Windows Applications" apps={allWindowsApps} category="all-windows-apps" />
    </div>
  )
}

function CommonIssuesSection() {
  const troubleshootingCommands = [
    "wsl --shutdown && wsl",
    "sudo chown -R $USER:$USER /home/$USER",
    'echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf',
    "wsl --unregister Ubuntu && wsl --install -d Ubuntu",
  ]

  return (
    <div className="space-y-6 max-w-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Common Issues & Fixes</h1>
        <p className="text-muted-foreground">Solutions for common WSL and Windows setup problems.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {troubleshootingCommands.map((command, index) => (
            <CommandBlock key={index} command={command} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function PerformanceSection() {
  return (
    <div className="space-y-6 max-w-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Performance Optimization</h1>
        <p className="text-muted-foreground">Optimize your WSL and Windows setup for better performance.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WSL Configuration</CardTitle>
          <CardDescription>Create or edit %UserProfile%\.wslconfig file</CardDescription>
        </CardHeader>
        <CardContent>
          <CommandBlock
            command="[wsl2]
memory=8GB
processors=4
swap=2GB"
          />
        </CardContent>
      </Card>
    </div>
  )
}
