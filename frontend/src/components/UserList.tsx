import { useEffect, useState } from 'react'
import { UserClient } from '../clients/UserClient'
import { User } from '../models/User'
import { UserInfo } from './UserInfo'

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])

  const userClient = new UserClient()

  useEffect(() => {
    async function getUsers() {
      const users = await userClient.getUsers()
      setUsers(users)
    }
    getUsers()
    return
  }, [])

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Position
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {users.map((user: User) => {
                return <UserInfo user={user} key={user.id} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
