import {Request, Response} from 'express'
import Usuario from "../models/usuarios";

export const getUsuarios = async (req: Request, res : Response  ) => {

    const usuarios = await Usuario.findAll({ where: { estado: true } })

    res.json({usuarios})
}

export const getUsuario = async (req: Request, res : Response  ) => {

    const { id } = req.params
    const usuario = await Usuario.findOne({ where: { id, estado: true} })
    if (usuario) {
        res.json({usuario})
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }

}


export const postUsuario = async (req: Request, res : Response  ) => {

    const { body } = req
    try {
        const exiteEmail = await Usuario.findOne({
            where: { email: body.email, estado: true}
        })
        if(exiteEmail) {
            return res.status(400).json({
                msg: `Ya exite un usuario con el email : ${body.email}`
            })
        }
        const usuario = new Usuario(body)
        await usuario.save()
        res.json({usuario})
    } catch (e) {
        res.status(500).json({
            msj: `Ha ocurrido un error, ${e}`
        })
    }
    res.json({
        msg: 'postUsuario',
        body
    })
}


export const putUsuario = async (req: Request, res : Response  ) => {
    const { id } = req.params
    const { body } = req
    try {
        const usuario = await Usuario.findOne({ where: { id, estado: true} })
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }

        await usuario.update(body)

        res.json(usuario)

    } catch (e) {
        res.status(500).json({
            msj: `Ha ocurrido un error, ${e}`
        })
    }
}

export const deleteUsuario = async (req: Request, res : Response  ) => {
    const { id } = req.params
    try {
        const usuario = await Usuario.findOne({ where: { id, estado: true} })
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }

        await usuario.update({ estado: false})
        res.json({usuario})

    } catch (e) {
        res.status(500).json({
            msj: `Ha ocurrido un error, ${e}`
        })
    }
}


