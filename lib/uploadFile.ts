import { writeFile } from 'fs/promises'
import path from 'path'
import { mkdirSync, existsSync } from 'fs'

export async  function uploadFile(image:File | string){ 
        if (typeof image =='string'){
                return image;
        }else{
                const bytes = await image.arrayBuffer()
                const buffer = Buffer.from(bytes)
        
                const uploadDir = path.join(process.cwd(), 'public', 'uploads')
                if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })
        
                const fileName = `${Date.now()}-${image.name.replace(/\s+/g, '_')}`
                const filePath = path.join(uploadDir, fileName)
        
                await writeFile(filePath, buffer)

                return `/uploads/${fileName}`
        }
        
}