
git 操作命令记录

### git clone <远程仓库地址>
example:git clone https://github.com/mumudev/MDP_Practice.git 




### 本地文件操作
添加到暂存区:git add . / git add *
添加到版本库:git commit -m 'message' /git commit -a 包含add操作


### 远程操作
推送本地某个分支文件:
git push <远程主机名> <本地分支名>:<远程分支名>
推送所有分支:git push --all origin
example: git push origin tim/story1
配置远程主机名与地址映射关系：git remote add origin <远程仓库地址>
拉取远程文件: git pull

删除远程分支:git push origin :tim/story1 /  git push origin --delete tim/story1
			 git branch -d -r branchname 



### 本地操作
初始化仓库：git init
查看本地所有分支：git branch -a
列出远程分支：git branch -r 
分支创建并切换 git checkout -b <分支名>
切换分支：git checkout <分支名>
删除本地分支:git branch -d <分支名> 
查看本地文件状态：git status
合并分支：git merge <分支名>

版本控制
丢弃本地文件修改
git checkout -- <filename>

根据远程分支回退：
git reset --hard origin/master
git fetch origin



提交流程 
1.切换分支 git checkout tim/story?
2.提交到暂存区 git add .
3.查看当前文件状态 git status
4.提交到版本库 git commit '-m' 'story? && story?'
5.推送到远程仓库 git push origin tim/story? 

其他 丢弃修改:git checkout -- file/ git reset HEAD file