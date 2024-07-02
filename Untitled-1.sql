select todo.* from (
select cm.CmnCelularId,cm.Descripcion,cm.Numero,um.UMovilId,um.descripcion as movil, um.Activo,um.EstadoId,um.ProveedorId,um.GPSId,um.AuditoriaUpdateUser,um.AuditoriaUpdateDate,um.ConfirmaAprov,um.ConfirmaAprovUltimaFecha FROM cmncelular AS Cm left JOIN umovil AS Um ON um.CmnCelularId = cm.CmnCelularId
) as todo
join 
(
select cm.Numero , max(um.descripcion) as descripcion ,max(Um.ConfirmaAprovUltimaFecha)  as ConfirmaAprovUltimaFecha
FROM cmncelular AS Cm left JOIN umovil AS Um ON um.CmnCelularId = cm.CmnCelularId
where  Cm.activo=1 
and ((left(cm.Descripcion, 2) in ('U ', 'R ', 'V ', 'M ') and len(rtrim(ltrim(cm.Descripcion)))<=5) or left(cm.Descripcion, 6)='Muleto')
and cm.Numero not in ( 1,123,'0','12345678',0,11111111,99999999)
group by cm.Numero
) reciente
on todo.Numero=reciente.numero and todo.ConfirmaAprovUltimaFecha=reciente.ConfirmaAprovUltimaFecha
where um.Descripcion <> todo.descripcion