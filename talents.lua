--[[
  This LUA script pulls the talent tree information for the logged in class and prints it to chat typescript formatted.
  Info needed to add manually: Arrows if prerequisites and description. Icons if they are not already in src/assets/icons/[class]. Everything else should be added automagically.
  The script was used together with SuperMacro
]]--
function TalentDep()
  for page = 1,3 do
    for ta = 1,25 do
      local name, texT , tierT, colT, _, maxR = GetTalentInfo(page,ta)
      local tierP, colP = GetTalentPrereqs(page,ta)
      if name then
        for t = 1,7 do
          if tostring(tierT) == tostring(t) then
            local tier = {"a","b","c","d","e","f","g"}
            Row = tier[t]
          end
	end
        if tierP then
          for depIndex = 1,25 do          
            depName, _, depT, depC = GetTalentInfo(page,depIndex)
            if depT == tierP and depC == colP then
              depend = depName
            end
          end
        end
        DEFAULT_CHAT_FRAME:AddMessage( "\""..name.."\": {" .. "name: \"" .. name .. "\", pos: \"" .. Row .. colT .. "\", icon: icons[\"" .. string.gsub(string.lower(texT),"interface\\icons\\","") .. "\"], maxRank: " .. maxR .. ", reqPoints: " .. ((tierT - 1) * 5) .. ", "..(tierP and "prereq: \"" .. depend .. "\", arrows: [{}], " or "") .. "description: talentText``, },")
      end
    end
  end
end
